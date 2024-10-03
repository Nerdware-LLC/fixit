import { DeleteMutationResponse } from "@fixit/api-schemas/GraphQL/responses";
import { invoiceModelHelpers } from "@fixit/dynamodb-models/Invoice";
import { User } from "@fixit/dynamodb-models/User";
import { WorkOrder } from "@fixit/dynamodb-models/WorkOrder";
import { UserInputError } from "@fixit/http-errors";
import { InvoiceService } from "@/services/InvoiceService/index.js";
import { createInvoiceZodSchema } from "./helpers.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  Query: {
    invoice: async (_parent, { invoiceID }) => {
      // Sanitize the provided invoiceID
      invoiceID = invoiceModelHelpers.id.sanitizeAndValidate(invoiceID);

      return await InvoiceService.findInvoiceByID({ invoiceID });
    },
    myInvoices: async (_parent, _args, { user }) => {
      return await InvoiceService.queryUsersInvoices({ authenticatedUser: user });
    },
  },
  Mutation: {
    createInvoice: async (_parent, { invoice: invoiceInput }, { user }) => {
      // Sanitize and validate the provided invoiceInput
      invoiceInput = createInvoiceZodSchema.parse(invoiceInput);

      return await InvoiceService.createInvoice({
        createdByUserID: user.id,
        ...invoiceInput,
      });
    },
    updateInvoiceAmount: async (_parent, { invoiceID, amount }, { user }) => {
      // Sanitize the provided invoiceID
      invoiceID = invoiceModelHelpers.id.sanitizeAndValidate(invoiceID);
      // Validate the provided amount
      if (!invoiceModelHelpers.amount.isValid(amount))
        throw new UserInputError(`Invalid value for field: "amount"`);

      return await InvoiceService.updateInvoiceAmount({
        invoiceID,
        amount,
        authenticatedUser: user,
      });
    },
    payInvoice: async (_parent, { invoiceID }, { user }) => {
      // Sanitize the provided invoiceID
      invoiceID = invoiceModelHelpers.id.sanitizeAndValidate(invoiceID);

      return await InvoiceService.payInvoice({ invoiceID, authenticatedUser: user });
    },
    deleteInvoice: async (_parent, { invoiceID }, { user }) => {
      // Sanitize the provided invoiceID
      invoiceID = invoiceModelHelpers.id.sanitizeAndValidate(invoiceID);

      const deletedInvoice = await InvoiceService.deleteInvoice({
        invoiceID,
        authenticatedUser: user,
      });

      return new DeleteMutationResponse({
        id: deletedInvoice.id,
        success: true,
      });
    },
  },
  Invoice: {
    // FIXME parent param not being typed correctly here in Invoice field resolvers.
    createdBy: async (parent, _args, { user }) => {
      const { createdByUserID } = parent;

      if (createdByUserID === user.id) return user;

      const createdByUser = await User.getItem({ id: createdByUserID });

      return createdByUser!;
    },
    // FIXME parent param not being typed correctly here in Invoice field resolvers.
    assignedTo: async ({ assignedToUserID }, _args, { user }) => {
      if (assignedToUserID === user.id) return user;

      const assignedToUser = await User.getItem({ id: assignedToUserID });

      return assignedToUser!;
    },
    // FIXME parent param not being typed correctly here in Invoice field resolvers.
    workOrder: async ({ workOrderID }, _args) => {
      if (!workOrderID) return null;

      const [workOrder] = await WorkOrder.query({ where: { id: workOrderID }, limit: 1 });

      return workOrder ?? null;
    },
  },
};
