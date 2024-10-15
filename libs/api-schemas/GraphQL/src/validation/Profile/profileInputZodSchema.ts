import { sanitizeDisplayName, isValidDisplayName } from "@fixit/dynamodb-models/Profile";
import { profileZodSchema } from "./profileZodSchema.js";
import { ProfileInputSchema as getGenerated_ProfileInputSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { ProfileInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_ProfileInputSchema();

/**
 * Zod schema for {@link ProfileInput} objects.
 */
export const profileInputZodSchema: ZodObjectWithShape<ProfileInput> = baseSchema.extend({
  displayName: baseSchema.shape.displayName.transform(
    getStringTransformer({
      fieldDescription: "profile display name",
      sanitize: sanitizeDisplayName,
      isValid: isValidDisplayName,
    })
  ),
  givenName: profileZodSchema.shape.givenName,
  familyName: profileZodSchema.shape.familyName,
  businessName: profileZodSchema.shape.businessName,
  photoUrl: profileZodSchema.shape.photoUrl,
});
