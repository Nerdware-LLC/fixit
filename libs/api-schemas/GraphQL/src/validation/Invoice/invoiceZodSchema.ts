import { z as zod } from "zod";
import { InvoiceIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/InvoiceID.js";
import { userZodSchema } from "../User/userZodSchema.js";
import { workOrderZodSchema } from "../WorkOrder/workOrderZodSchema.js";
import { InvoiceSchema as getGenerated_InvoiceSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { Invoice } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_InvoiceSchema();

/**
 * Zod schema for {@link Invoice} objects.
 */
export const invoiceZodSchema: ZodObjectWithShape<Invoice> = baseSchema.extend({
  id: baseSchema.shape.id.transform(
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
