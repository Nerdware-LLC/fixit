import { sanitizeName, isValidName } from "@nerdware/ts-string-helpers";
import { sanitizeStreetAddress, isValidStreetAddress } from "@fixit/dynamodb-models/Location";
import { LocationSchema as getGenerated_LocationSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { Location } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_LocationSchema();

/**
 * Zod schema for {@link Location} objects.
 */
export const locationZodSchema: ZodObjectWithShape<Location> = baseSchema.extend({
  streetLine1: baseSchema.shape.streetLine1.transform(
    getStringTransformer({
      fieldDescription: "street address line 1",
      sanitize: sanitizeStreetAddress,
      isValid: isValidStreetAddress,
    })
  ),
  streetLine2: baseSchema.shape.streetLine2.transform(
    getStringTransformer({
      fieldDescription: "street address line 2",
      sanitize: sanitizeStreetAddress,
      isValid: isValidStreetAddress,
    })
  ),
  city: baseSchema.shape.city.transform(
    getStringTransformer({
      fieldDescription: "city",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  region: baseSchema.shape.region.transform(
    getStringTransformer({
      fieldDescription: "region",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  country: baseSchema.shape.country.transform(
    getStringTransformer({
      fieldDescription: "country",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
});
