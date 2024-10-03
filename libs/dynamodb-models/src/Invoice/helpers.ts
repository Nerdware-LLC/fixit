import { isSafeInteger } from "@nerdware/ts-type-safety-utils";
import { getRandomUUIDv4 } from "@fixit/uuid";
import { INVOICE_SK_REGEX, INVOICE_SK_PREFIX_STR } from "./regex.js";
import { createHelpersForStrAttr } from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

export const invoiceModelHelpers = {
  id: createHelpersForStrAttr("id", {
    /** Invoice ID validation regex. */
    regex: INVOICE_SK_REGEX,
    /** Sanitizes an Invoice ID value. */
    sanitize: (str: string) => str.replace(/[^a-zA-Z0-9_@#-]/g, ""), // handle chars, UUID chars, and the delimeter
    /** Invoice "id" value formatter. */
    format: (createdByUserID: string) => {
      return `${INVOICE_SK_PREFIX_STR}${DELIMITER}${createdByUserID}${DELIMITER}${getRandomUUIDv4()}`;
    },
  }),
  amount: {
    isValid: (value?: unknown) => isSafeInteger(value) && value > 0,
  },
};
