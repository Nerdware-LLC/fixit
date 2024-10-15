import { UserIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/UserID.js";
import { WorkOrderIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/WorkOrderID.js";
import { invoiceZodSchema } from "./invoiceZodSchema.js";
import { InvoiceInputSchema as getGenerated_InvoiceInputSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { InvoiceInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_InvoiceInputSchema();

/**
 * Zod schema for {@link InvoiceInput} objects.
 */
export const invoiceInputZodSchema: ZodObjectWithShape<InvoiceInput> = baseSchema.extend({
  assignedToUserID: baseSchema.shape.assignedToUserID.transform(
    getStringTransformer({
      fieldDescription: "invoice assignee user ID",
      sanitize: UserIDGraphQLScalar.sanitize,
      isValid: UserIDGraphQLScalar.isValid,
    })
  ),
  amount: invoiceZodSchema.shape.amount,
  workOrderID: baseSchema.shape.workOrderID.transform(
    getStringTransformer({
      fieldDescription: "invoice work order ID",
      sanitize: WorkOrderIDGraphQLScalar.sanitize,
      isValid: WorkOrderIDGraphQLScalar.isValid,
    })
  ),
});
