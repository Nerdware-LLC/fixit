import { UserIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/UserID.js";
import { WorkOrderIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/WorkOrderID.js";
import { invoiceZodSchema } from "./invoiceZodSchema.js";
import { InvoiceInputSchema as gend_InvoiceInputSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { InvoiceInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link InvoiceInput} objects.
 */
export const invoiceInputZodSchema: ZodObjectWithShape<InvoiceInput> =
  gend_InvoiceInputSchema.extend({
    assignedToUserID: gend_InvoiceInputSchema.shape.assignedToUserID.transform(
      getStringTransformer({
        fieldDescription: "invoice assignee user ID",
        sanitize: UserIDGraphQLScalar.sanitize,
        isValid: UserIDGraphQLScalar.isValid,
      })
    ),
    amount: invoiceZodSchema.shape.amount,
    workOrderID: gend_InvoiceInputSchema.shape.workOrderID.transform(
      getStringTransformer({
        fieldDescription: "invoice work order ID",
        sanitize: WorkOrderIDGraphQLScalar.sanitize,
        isValid: WorkOrderIDGraphQLScalar.isValid,
      })
    ),
  });
