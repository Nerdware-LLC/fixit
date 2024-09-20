import { Invoice } from "@fixit/dynamodb-models/Invoice";
import { UserInputError } from "@fixit/http-errors";
import { eventEmitter } from "@/events/eventEmitter.js";
import { AuthService } from "@/services/AuthService/index.js";
import type { MutationUpdateInvoiceAmountArgs } from "@fixit/api-schemas/GraphQL/types";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";

/**
 * ### InvoiceService - updateInvoiceAmount
 */
export const updateInvoiceAmount = async ({
  invoiceID,
  amount,
  authenticatedUser,
}: MutationUpdateInvoiceAmountArgs & { authenticatedUser: AuthTokenPayload }) => {
  const [existingInv] = await Invoice.query({ where: { id: invoiceID }, limit: 1 });

  if (!existingInv) throw new UserInputError("An invoice with the provided ID could not be found.");

  AuthService.verifyUserIsAuthorized.toPerformThisUpdate(existingInv, {
    idOfUserWhoCanPerformThisUpdate: existingInv.createdByUserID,
    authenticatedUserID: authenticatedUser.id,
    forbiddenStatuses: {
      CLOSED: "The requested invoice has already been closed.",
      DISPUTED:
        "The requested invoice has been disputed and cannot be updated at this time. " +
        "Please contact the invoice's recipient for details and further assistance.",
    },
  });

  const updatedInvoice = await Invoice.updateItem(
    { id: existingInv.id, createdByUserID: existingInv.createdByUserID },
    {
      update: { amount },
    }
  );

  eventEmitter.emitInvoiceUpdated(updatedInvoice);

  return updatedInvoice;
};
