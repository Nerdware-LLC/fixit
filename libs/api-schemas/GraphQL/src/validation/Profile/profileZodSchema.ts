import { sanitizeName, isValidName, sanitizeURL, isValidURL } from "@nerdware/ts-string-helpers";
import { sanitizeDisplayName, isValidDisplayName } from "@fixit/dynamodb-models/Profile";
import { ProfileSchema as gend_ProfileSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { Profile } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link Profile} objects.
 */
export const profileZodSchema: ZodObjectWithShape<Profile> = gend_ProfileSchema.extend({
  displayName: gend_ProfileSchema.shape.displayName.transform(
    getStringTransformer({
      fieldDescription: "profile display name",
      sanitize: sanitizeDisplayName,
      isValid: isValidDisplayName,
    })
  ),
  givenName: gend_ProfileSchema.shape.givenName.transform(
    getStringTransformer({
      fieldDescription: "profile given name",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  familyName: gend_ProfileSchema.shape.familyName.transform(
    getStringTransformer({
      fieldDescription: "profile family name",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  businessName: gend_ProfileSchema.shape.businessName.transform(
    getStringTransformer({
      fieldDescription: "profile business name",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  photoUrl: gend_ProfileSchema.shape.photoUrl.transform(
    getStringTransformer({
      fieldDescription: "profile photo URL",
      sanitize: sanitizeURL,
      isValid: isValidURL,
    })
  ),
});
