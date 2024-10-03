import { USER_ID_REGEX, USER_ID_PREFIX_STR, USER_SK_REGEX, USER_SK_PREFIX_STR } from "./regex.js";
import { createMapOfStringAttrHelpers } from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

export const userModelHelpers = createMapOfStringAttrHelpers({
  id: {
    /** Validation regex for User IDs. */
    regex: USER_ID_REGEX,
    /** User "id" value formatter. */
    format: (handle: string) => `${USER_ID_PREFIX_STR}${DELIMITER}${handle}`,
    /** Sanitizes a User ID value (permits `handle` chars and the {@link DELIMITER} char). */
    sanitize: (str: string) => str.replace(/[^a-zA-Z0-9_@#]/g, ""),
  },
  sk: {
    /** Validation regex for User `sk` attribute values. */
    regex: USER_SK_REGEX,
    /** User "sk" value formatter. */
    format: (userID: string) => `${USER_SK_PREFIX_STR}${DELIMITER}${userID}`,
  },
});

/**
 * User Model helper fn which extracts a User's `handle` from their `id`.
 */
export const extractHandleFromUserID = (userID: string): string => {
  return userID.substring(USER_ID_PREFIX_STR.length + 1);
};
