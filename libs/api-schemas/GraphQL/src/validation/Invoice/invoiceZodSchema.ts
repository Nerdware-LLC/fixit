import { z as zod } from "zod";
import { InvoiceIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/InvoiceID.js";
import { userZodSchema } from "../User/userZodSchema.js";
import { workOrderZodSchema } from "../WorkOrder/workOrderZodSchema.js";
import { InvoiceSchema as gend_InvoiceSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { Invoice } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link Invoice} objects.
 */
export const invoiceZodSchema: ZodObjectWithShape<Invoice> = gend_InvoiceSchema.extend({
  id: gend_InvoiceSchema.shape.id.transform(
    getStringTransformer({
      fieldDescription: "invoice ID",
      sanitize: InvoiceIDGraphQLScalar.sanitize,
      isValid: InvoiceIDGraphQLScalar.isValid,
    })
  ),
  createdBy: userZodSchema,
  assignedTo: userZodSchema,
  amount: zod.number().positive().int(),
  workOrder: workOrderZodSchema.nullish(),
});
