import { USER_ID_REGEX_PATTERN_STR } from "../User/regex.js";
import { DELIMITER } from "../_common/delimiter.js";

export const CONTACT_SK_PREFIX_STR = "CONTACT";
export const CONTACT_SK_REGEX_PATTERN_STR = `${CONTACT_SK_PREFIX_STR}${DELIMITER}${USER_ID_REGEX_PATTERN_STR}`;
export const CONTACT_SK_REGEX = new RegExp(`^${CONTACT_SK_REGEX_PATTERN_STR}$`);
