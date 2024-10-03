import { isString } from "@nerdware/ts-type-safety-utils";
import dayjs from "dayjs";
import { pricesCache } from "@fixit/stripe-client/caches/pricesCache.js";
import { SUB_SK_REGEX, SUB_SK_PREFIX_STR } from "./regex.js";
import { createMapOfStringAttrHelpers } from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

export const subModelHelpers = {
  ...createMapOfStringAttrHelpers({
    sk: {
      /** Validation regex for `UserSubscription.sk` values. */
      regex: SUB_SK_REGEX,
      /** Returns a formatted UserSubscription "sk" value. */
      format: (userID: string, createdAt: Date) => {
        return `${SUB_SK_PREFIX_STR}${DELIMITER}${userID}${DELIMITER}${dayjs(createdAt).unix()}`;
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
