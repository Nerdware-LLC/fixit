import { userModelHelpers } from "../User/helpers.js";
import { createMapOfStringAttrHelpers, getCompoundAttrRegex, DELIMETER } from "../_common/index.js";

export const SCA_SK_PREFIX_STR = "STRIPE_CONNECT_ACCOUNT";

export const scaModelHelpers = createMapOfStringAttrHelpers({
  sk: {
    /** Validation regex for `UserStripeConnectAccount.sk` values. */
    regex: getCompoundAttrRegex([SCA_SK_PREFIX_STR, userModelHelpers.id.regex]),
    /** Returns a formatted `UserStripeConnectAccount.sk` value. */
    format: (userID: string) => `${SCA_SK_PREFIX_STR}${DELIMETER}${userID}`,
  },
});
