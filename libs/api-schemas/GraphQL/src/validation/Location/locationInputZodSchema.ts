import { locationZodSchema } from "./locationZodSchema.js";
import { LocationInputSchema as gend_LocationInputSchema } from "../__generated__.zodSchemas.js";
import type { LocationInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link LocationInput} objects.
 */
export const locationInputZodSchema: ZodObjectWithShape<LocationInput> =
  gend_LocationInputSchema.extend({
    streetLine1: locationZodSchema.shape.streetLine1,
    streetLine2: locationZodSchema.shape.streetLine2,
    city: locationZodSchema.shape.city,
    region: locationZodSchema.shape.region,
    country: locationZodSchema.shape.country.nullish().default("USA"),
  });
