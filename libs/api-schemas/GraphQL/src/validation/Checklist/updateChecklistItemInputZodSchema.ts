import { checklistItemZodSchema } from "./checklistItemZodSchema.js";
import { UpdateChecklistItemInputSchema as gend_UpdateChecklistItemInputSchema } from "../__generated__.zodSchemas.js";
import type { UpdateChecklistItemInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link UpdateChecklistItemInput} objects.
 */
export const updateChecklistItemInputZodSchema: ZodObjectWithShape<UpdateChecklistItemInput> =
  gend_UpdateChecklistItemInputSchema.extend({
    id: checklistItemZodSchema.shape.id.nullish(),
    description: checklistItemZodSchema.shape.description,
  });
