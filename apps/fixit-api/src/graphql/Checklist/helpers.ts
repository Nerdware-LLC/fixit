import { sanitizeText, isValidText } from "@nerdware/ts-string-helpers";
import { z as zod } from "zod";
import type { ZodObjectWithShape } from "@/types/zod.js";
import type {
  CreateChecklistItemInput,
  UpdateChecklistItemInput,
} from "@fixit/api-schemas/GraphQL/types";

/**
 * Zod schema for {@link CreateChecklistItemInput} objects.
 */
export const createChecklistItemZodSchema = zod
  .object({
    description: zod.string().transform(sanitizeText).refine(isValidText),
    isCompleted: zod
      .boolean()
      .nullish()
      .default(false)
      .transform((value) => !!value),
  })
  .strict() satisfies ZodObjectWithShape<CreateChecklistItemInput>;

/**
 * Zod schema for {@link UpdateChecklistItemInput} objects.
 */
export const updateChecklistItemZodSchema = createChecklistItemZodSchema.extend({
  id: zod.string().nullish().default(null),
}) satisfies ZodObjectWithShape<UpdateChecklistItemInput>;
