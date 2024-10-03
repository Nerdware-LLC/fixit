import { USER_ID_REGEX_PATTERN_STR } from "../User/regex.js";
import { DELIMITER } from "../_common/delimiter.js";
import { UUID_REGEX_PATTERN_STR } from "../_common/regex.js";

// Note: for Invoices, the SK = the Invoice ID

export const INVOICE_SK_PREFIX_STR = "INV";
export const INVOICE_SK_REGEX_PATTERN_STR = `${INVOICE_SK_PREFIX_STR}${DELIMITER}${USER_ID_REGEX_PATTERN_STR}${DELIMITER}${UUID_REGEX_PATTERN_STR}`;
export const INVOICE_SK_REGEX = new RegExp(`^${INVOICE_SK_REGEX_PATTERN_STR}$`);
