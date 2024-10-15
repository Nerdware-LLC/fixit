import { sanitizeName, isValidName, sanitizeURL, isValidURL } from "@nerdware/ts-string-helpers";
import { sanitizeDisplayName, isValidDisplayName } from "@fixit/dynamodb-models/Profile";
import { ProfileSchema as getGenerated_ProfileSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { Profile } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_ProfileSchema();

/**
 * Zod schema for {@link Profile} objects.
 */
export const profileZodSchema: ZodObjectWithShape<Profile> = baseSchema.extend({
  displayName: baseSchema.shape.displayName.transform(
    getStringTransformer({
      fieldDescription: "profile display name",
      sanitize: sanitizeDisplayName,
      isValid: isValidDisplayName,
    })
  ),
  givenName: baseSchema.shape.givenName.transform(
    getStringTransformer({
      fieldDescription: "profile given name",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  familyName: baseSchema.shape.familyName.transform(
    getStringTransformer({
      fieldDescription: "profile family name",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  businessName: baseSchema.shape.businessName.transform(
    getStringTransformer({
      fieldDescription: "profile business name",
      sanitize: sanitizeName,
      isValid: isValidName,
    })
  ),
  photoUrl: baseSchema.shape.photoUrl.transform(
    getStringTransformer({
      fieldDescription: "profile photo URL",
      sanitize: sanitizeURL,
      isValid: isValidURL,
    })
  ),
});
