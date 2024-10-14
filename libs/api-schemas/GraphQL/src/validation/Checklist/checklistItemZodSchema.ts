import { sanitizeText, isValidText } from "@nerdware/ts-string-helpers";
import { WorkOrderChecklistItemIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/WorkOrderChecklistItemID.js";
import { ChecklistItemSchema as gend_ChecklistItemSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { ChecklistItem } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link ChecklistItem} objects.
 */
export const checklistItemZodSchema: ZodObjectWithShape<ChecklistItem> =
  gend_ChecklistItemSchema.extend({
    id: gend_ChecklistItemSchema.shape.id.transform(
      getStringTransformer({
        fieldDescription: "checklist item ID",
        sanitize: WorkOrderChecklistItemIDGraphQLScalar.sanitize,
        isValid: WorkOrderChecklistItemIDGraphQLScalar.isValid,
      })
    ),
    description: gend_ChecklistItemSchema.shape.description.transform(
      getStringTransformer({
        fieldDescription: "checklist item description",
        sanitize: sanitizeText,
        isValid: isValidText,
      })
    ),
  });
