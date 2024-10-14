import {
  sanitizeHandle,
  isValidHandle,
  sanitizeEmail,
  isValidEmail,
  sanitizePhone,
  isValidPhone,
} from "@nerdware/ts-string-helpers";
import { UserIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/UserID.js";
import { UserSchema as gend_UserSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { User } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link User} objects.
 */
export const userZodSchema: ZodObjectWithShape<User> = gend_UserSchema.extend({
  id: gend_UserSchema.shape.id.transform(
    getStringTransformer({
      fieldDescription: "user ID",
      sanitize: UserIDGraphQLScalar.sanitize,
      isValid: UserIDGraphQLScalar.isValid,
    })
  ),
  handle: gend_UserSchema.shape.handle.transform(
    getStringTransformer({
      fieldDescription: "user handle",
      sanitize: sanitizeHandle,
      isValid: isValidHandle,
    })
  ),
  email: gend_UserSchema.shape.email.transform(
    getStringTransformer({
      fieldDescription: "user email",
      sanitize: sanitizeEmail,
      isValid: isValidEmail,
    })
  ),
  phone: gend_UserSchema.shape.phone.transform(
    getStringTransformer({
      fieldDescription: "user phone",
      sanitize: sanitizePhone,
      isValid: isValidPhone,
    })
  ),
});
