import { sanitizeName, isValidName } from "@nerdware/ts-string-helpers";
import { sanitizeStreetAddress, isValidStreetAddress } from "@fixit/dynamodb-models/Location";
import { LocationSchema as gend_LocationSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { Location } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link Location} objects.
 */
export const locationZodSchema: ZodObjectWithShape<Location> = gend_LocationSchema.extend({
  streetLine1: gend_LocationSchema.shape.streetLine1.transform(
    getStringTransformer({
      fieldDescription: "street address line 1",
      sanitize: sanitizeStreetAddress,
      isValid: isValidStreetAddress,
    })
  ),
  streetLine2: gend_LocationSchema.shape.streetLine2.transform(
    getStringTransformer({
      fieldDescription: "street address line 2",
      sanitize: sanitizeStreetAddress,
      isValid: isValidStreetAddress,
    })
  ),
  city: gend_LocationSchema.shape.city.transform(
    getStringTransformer({
      fieldDescription: "city",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  region: gend_LocationSchema.shape.region.transform(
    getStringTransformer({
      fieldDescription: "region",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  country: gend_LocationSchema.shape.country.transform(
    getStringTransformer({
      fieldDescription: "country",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
});
