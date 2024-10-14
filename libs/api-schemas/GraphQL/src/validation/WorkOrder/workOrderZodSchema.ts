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
import { WorkOrderSchema as gend_WorkOrderSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { WorkOrder } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link WorkOrder} objects.
 */
export const workOrderZodSchema: ZodObjectWithShape<WorkOrder> = gend_WorkOrderSchema.extend({
  id: gend_WorkOrderSchema.shape.id.transform(
    getStringTransformer({
      fieldDescription: "work order ID",
      sanitize: WorkOrderIDGraphQLScalar.sanitize,
      isValid: WorkOrderIDGraphQLScalar.isValid,
    })
  ),
  createdBy: userZodSchema,
  assignedTo: userZodSchema.nullish(),
  checklist: zod.array(checklistItemZodSchema).nullish(),
  contractorNotes: gend_WorkOrderSchema.shape.contractorNotes.transform(
    getStringTransformer({
      fieldDescription: "contractor notes",
      sanitize: sanitizeText,
      isValid: isValidText,
    })
  ),
  description: gend_WorkOrderSchema.shape.description.transform(
    getStringTransformer({
      fieldDescription: "work order description",
      sanitize: sanitizeText,
      isValid: isValidText,
    })
  ),
  entryContact: gend_WorkOrderSchema.shape.entryContact.transform(
    getStringTransformer({
      fieldDescription: "entry contact",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  entryContactPhone: gend_WorkOrderSchema.shape.entryContactPhone.transform(
    getStringTransformer({
      fieldDescription: "entry contact phone number",
      sanitize: sanitizePhone,
      isValid: isValidPhone,
    })
  ),
  location: locationZodSchema,
});
