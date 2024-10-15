import { checklistItemZodSchema } from "./checklistItemZodSchema.js";
import { CreateChecklistItemInputSchema as getGenerated_CreateChecklistItemInputSchema } from "../__generated__.zodSchemas.js";
import type { CreateChecklistItemInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_CreateChecklistItemInputSchema();

/**
 * Zod schema for {@link CreateChecklistItemInput} objects.
 */
export const createChecklistItemInputZodSchema: ZodObjectWithShape<CreateChecklistItemInput> =
  baseSchema.extend({
    description: checklistItemZodSchema.shape.description,
  });
