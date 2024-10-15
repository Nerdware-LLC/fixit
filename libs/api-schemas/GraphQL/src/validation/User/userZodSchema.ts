import {
  sanitizeHandle,
  isValidHandle,
  sanitizeEmail,
  isValidEmail,
  sanitizePhone,
  isValidPhone,
} from "@nerdware/ts-string-helpers";
import { UserIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/UserID.js";
import { UserSchema as getGenerated_UserSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { User } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_UserSchema();

/**
 * Zod schema for {@link User} objects.
 */
export const userZodSchema: ZodObjectWithShape<User> = baseSchema.extend({
  id: baseSchema.shape.id.transform(
    getStringTransformer({
      fieldDescription: "user ID",
      sanitize: UserIDGraphQLScalar.sanitize,
      isValid: UserIDGraphQLScalar.isValid,
    })
  ),
  handle: baseSchema.shape.handle.transform(
    getStringTransformer({
      fieldDescription: "user handle",
      sanitize: sanitizeHandle,
      isValid: isValidHandle,
    })
  ),
  email: baseSchema.shape.email.transform(
    getStringTransformer({
      fieldDescription: "user email",
      sanitize: sanitizeEmail,
      isValid: isValidEmail,
    })
  ),
  phone: baseSchema.shape.phone.transform(
    getStringTransformer({
      fieldDescription: "user phone",
      sanitize: sanitizePhone,
      isValid: isValidPhone,
    })
  ),
});
