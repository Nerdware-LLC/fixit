import { Invoice } from "@fixit/dynamodb-models/Invoice";
import { UserInputError } from "@fixit/http-errors";
import { eventEmitter } from "@/events/eventEmitter.js";
import { AuthService } from "@/services/AuthService/index.js";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";

/**
 * ### InvoiceService - deleteInvoice
 */
export const deleteInvoice = async ({
  invoiceID,
  authenticatedUser,
}: {
  invoiceID: string;
  authenticatedUser: AuthTokenPayload;
}) => {
  const [existingInv] = await Invoice.query({
    where: { id: invoiceID },
    limit: 1,
  });

  if (!existingInv) throw new UserInputError("An invoice with the provided ID could not be found.");

  AuthService.verifyUserIsAuthorized.toPerformThisUpdate(existingInv, {
    idOfUserWhoCanPerformThisUpdate: existingInv.createdByUserID,
    authenticatedUserID: authenticatedUser.id,
    forbiddenStatuses: {
      CLOSED: "The requested invoice has already been closed.",
      DISPUTED: "The requested invoice has been disputed and cannot be deleted at this time.",
    },
  });

  const deletedInvoice = await Invoice.deleteItem({
    createdByUserID: existingInv.createdByUserID,
    id: existingInv.id,
  });

  eventEmitter.emitInvoiceDeleted(deletedInvoice);

  return deletedInvoice;
};
