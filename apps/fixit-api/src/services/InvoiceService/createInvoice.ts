import { Invoice } from "@fixit/dynamodb-models/Invoice";
import { eventEmitter } from "@/events/eventEmitter.js";
import type { InvoiceInput } from "@fixit/api-schemas/GraphQL/types";

/**
 * ### InvoiceService - createInvoice
 */
export const createInvoice = async (invInput: { createdByUserID: string } & InvoiceInput) => {
  const createdInvoice = await Invoice.createItem({
    createdByUserID: invInput.createdByUserID,
    assignedToUserID: invInput.assignedToUserID,
    amount: invInput.amount,
    status: "OPEN",
    ...(invInput.workOrderID && {
      workOrderID: invInput.workOrderID,
    }),
  });

  eventEmitter.emitInvoiceCreated(createdInvoice);

  return createdInvoice;
};
