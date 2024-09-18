import { isString } from "@nerdware/ts-type-safety-utils";
import dayjs from "dayjs";
import { pricesCache } from "@fixit/stripe-client/caches/pricesCache.js";
import { UNIX_TIMESTAMP_REGEX } from "@fixit/timestamp-utils";
import { userModelHelpers } from "../User/helpers.js";
import { createMapOfStringAttrHelpers, getCompoundAttrRegex, DELIMETER } from "../_common/index.js";

export const SUB_SK_PREFIX_STR = "SUBSCRIPTION";

export const subModelHelpers = {
  ...createMapOfStringAttrHelpers({
    sk: {
      /** Validation regex for `UserSubscription.sk` values. */
      regex: getCompoundAttrRegex([
        SUB_SK_PREFIX_STR,
        userModelHelpers.id.regex,
        UNIX_TIMESTAMP_REGEX,
      ]),
      /** Returns a formatted UserSubscription "sk" value. */
      format: (userID: string, createdAt: Date) => {
        return `${SUB_SK_PREFIX_STR}${DELIMETER}${userID}${DELIMETER}${dayjs(createdAt).unix()}`;
      },
    },
  }),
  /** priceID validation uses cache data rather than regex patterns. */
  priceID: {
    isValid: (value?: unknown) => {
      return isString(value) && pricesCache.values().some(({ id: priceID }) => priceID === value);
    },
  },
};
