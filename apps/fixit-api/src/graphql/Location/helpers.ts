import { sanitizeName, isValidName } from "@nerdware/ts-string-helpers";
import { z as zod } from "zod";
import { sanitizeStreetAddress, isValidStreetAddress } from "@fixit/dynamodb-models/Location";
import type { ZodObjectWithShape } from "@/types/zod.js";
import type { CreateLocationInput } from "@fixit/api-schemas/GraphQL/types";

/**
 * Zod schema for {@link CreateLocationInput} objects.
 */
export const locationInputZodSchema = zod
  .object({
    city: zod.string().transform(sanitizeName).refine(isValidName),
    country: zod
      .string()
      .nullish()
      .default("USA")
      .transform((value) => (value ? sanitizeName(value) : "USA"))
      .refine(isValidName),
    region: zod.string().transform(sanitizeName).refine(isValidName),
    streetLine1: zod.string().transform(sanitizeStreetAddress).refine(isValidStreetAddress),
    streetLine2: zod
      .string()
      .nullish()
      .default(null)
      .transform((value) => (value ? sanitizeStreetAddress(value) : null))
      .refine((value) => (value ? isValidStreetAddress(value) : value === null)),
  })
  .strict() satisfies ZodObjectWithShape<CreateLocationInput>;
