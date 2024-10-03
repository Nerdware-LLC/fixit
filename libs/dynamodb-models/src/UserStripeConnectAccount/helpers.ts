import { SCA_SK_REGEX, SCA_SK_PREFIX_STR } from "./regex.js";
import { createMapOfStringAttrHelpers } from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

export const scaModelHelpers = createMapOfStringAttrHelpers({
  sk: {
    /** Validation regex for `UserStripeConnectAccount.sk` values. */
    regex: SCA_SK_REGEX,
    /** Returns a formatted `UserStripeConnectAccount.sk` value. */
    format: (userID: string) => `${SCA_SK_PREFIX_STR}${DELIMITER}${userID}`,
  },
});
