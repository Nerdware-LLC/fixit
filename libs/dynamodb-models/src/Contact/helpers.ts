import { CONTACT_SK_REGEX, CONTACT_SK_PREFIX_STR } from "./regex.js";
import { userModelHelpers } from "../User/helpers.js";
import { createMapOfStringAttrHelpers } from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

export const contactModelHelpers = createMapOfStringAttrHelpers({
  id: {
    /** Validation regex for Contact IDs. */
    regex: CONTACT_SK_REGEX,
    /** Sanitizes a Contact ID value. */
    sanitize: userModelHelpers.id.sanitize,
    /** Returns a formatted Contact "id" value. */
    format: (contactUserID: string) => `${CONTACT_SK_PREFIX_STR}${DELIMITER}${contactUserID}`,
  },
});
