import {
  sanitizeText,
  isValidText,
  sanitizeName,
  isValidName,
  sanitizePhone,
  isValidPhone,
} from "@nerdware/ts-string-helpers";
import { z as zod } from "zod";
import { WorkOrderIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/WorkOrderID.js";
import { checklistItemZodSchema } from "../Checklist/checklistItemZodSchema.js";
import { locationZodSchema } from "../Location/locationZodSchema.js";
import { userZodSchema } from "../User/userZodSchema.js";
import { WorkOrderSchema as getGenerated_WorkOrderSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { WorkOrder } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_WorkOrderSchema();

/**
 * Zod schema for {@link WorkOrder} objects.
 */
export const workOrderZodSchema: ZodObjectWithShape<WorkOrder> = baseSchema.extend({
  id: baseSchema.shape.id.transform(
    getStringTransformer({
      fieldDescription: "work order ID",
      sanitize: WorkOrderIDGraphQLScalar.sanitize,
      isValid: WorkOrderIDGraphQLScalar.isValid,
    })
  ),
  createdBy: userZodSchema,
  assignedTo: userZodSchema.nullish(),
  checklist: zod.array(checklistItemZodSchema).nullish(),
  contractorNotes: baseSchema.shape.contractorNotes.transform(
    getStringTransformer({
      fieldDescription: "contractor notes",
      sanitize: sanitizeText,
      isValid: isValidText,
    })
  ),
  description: baseSchema.shape.description.transform(
    getStringTransformer({
      fieldDescription: "work order description",
      sanitize: sanitizeText,
      isValid: isValidText,
    })
  ),
  entryContact: baseSchema.shape.entryContact.transform(
    getStringTransformer({
      fieldDescription: "entry contact",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  entryContactPhone: baseSchema.shape.entryContactPhone.transform(
    getStringTransformer({
      fieldDescription: "entry contact phone number",
      sanitize: sanitizePhone,
      isValid: isValidPhone,
    })
  ),
  location: locationZodSchema,
});
