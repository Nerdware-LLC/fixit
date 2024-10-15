import { checklistItemZodSchema } from "./checklistItemZodSchema.js";
import { UpdateChecklistItemInputSchema as getGenerated_UpdateChecklistItemInputSchema } from "../__generated__.zodSchemas.js";
import type { UpdateChecklistItemInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_UpdateChecklistItemInputSchema();

/**
 * Zod schema for {@link UpdateChecklistItemInput} objects.
 */
export const updateChecklistItemInputZodSchema: ZodObjectWithShape<UpdateChecklistItemInput> =
  baseSchema.extend({
    id: checklistItemZodSchema.shape.id.nullish(),
    description: checklistItemZodSchema.shape.description,
  });
