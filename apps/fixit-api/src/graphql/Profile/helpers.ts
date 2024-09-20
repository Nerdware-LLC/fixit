import { sanitizeName, isValidName } from "@nerdware/ts-string-helpers";
import { z as zod } from "zod";
import { sanitizeDisplayName, isValidDisplayName } from "@fixit/dynamodb-models/Profile";
import type { ZodObjectWithShape } from "@/types/zod.js";
import type { ProfileInput } from "@fixit/api-schemas/GraphQL/types";

/**
 * Zod schema for {@link ProfileInput} objects.
 */
export const createProfileZodSchema = zod
  .object({
    displayName: zod
      .string()
      .nullish()
      .default(null)
      .transform((value) => (value ? sanitizeDisplayName(value) : null))
      .refine((value) => (value ? isValidDisplayName(value) : value === null), {
        message: "Invalid display name",
      }),
    givenName: zod
      .string()
      .nullish()
      .default(null)
      .transform((value) => (value ? sanitizeName(value) : null))
      .refine((value) => (value ? isValidName(value) : value === null), {
        message: "Invalid given name",
      }),
    familyName: zod
      .string()
      .nullish()
      .default(null)
      .transform((value) => (value ? sanitizeName(value) : null))
      .refine((value) => (value ? isValidName(value) : value === null), {
        message: "Invalid family name",
      }),
    businessName: zod
      .string()
      .nullish()
      .default(null)
      .transform((value) => (value ? sanitizeName(value) : null))
      .refine((value) => (value ? isValidName(value) : value === null), {
        message: "Invalid business name",
      }),
    photoUrl: zod.string().url().nullish().default(null),
  })
  .strict() satisfies ZodObjectWithShape<ProfileInput>;
