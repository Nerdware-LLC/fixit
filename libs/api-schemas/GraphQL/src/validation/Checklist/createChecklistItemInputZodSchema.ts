import { checklistItemZodSchema } from "./checklistItemZodSchema.js";
import { CreateChecklistItemInputSchema as gend_CreateChecklistItemInputSchema } from "../__generated__.zodSchemas.js";
import type { CreateChecklistItemInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link CreateChecklistItemInput} objects.
 */
export const createChecklistItemInputZodSchema: ZodObjectWithShape<CreateChecklistItemInput> =
  gend_CreateChecklistItemInputSchema.extend({
    description: checklistItemZodSchema.shape.description,
  });
