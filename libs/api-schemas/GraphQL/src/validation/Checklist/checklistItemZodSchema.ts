import { sanitizeText, isValidText } from "@nerdware/ts-string-helpers";
import { WorkOrderChecklistItemIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/WorkOrderChecklistItemID.js";
import { ChecklistItemSchema as getGenerated_ChecklistItemSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { ChecklistItem } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_ChecklistItemSchema();

/**
 * Zod schema for {@link ChecklistItem} objects.
 */
export const checklistItemZodSchema: ZodObjectWithShape<ChecklistItem> = baseSchema.extend({
  id: baseSchema.shape.id.transform(
    getStringTransformer({
      fieldDescription: "checklist item ID",
      sanitize: WorkOrderChecklistItemIDGraphQLScalar.sanitize,
      isValid: WorkOrderChecklistItemIDGraphQLScalar.isValid,
    })
  ),
  description: baseSchema.shape.description.transform(
    getStringTransformer({
      fieldDescription: "checklist item description",
      sanitize: sanitizeText,
      isValid: isValidText,
    })
  ),
});
