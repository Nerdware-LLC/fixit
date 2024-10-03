import { DELIMITER } from "../_common/delimiter.js";
import { HANDLE_REGEX_PATTERN_STR } from "../_common/regex.js";

export const USER_ID_PREFIX_STR = "USER";
export const USER_ID_REGEX_PATTERN_STR = `${USER_ID_PREFIX_STR}${DELIMITER}${HANDLE_REGEX_PATTERN_STR}`;
export const USER_ID_REGEX = new RegExp(`^${USER_ID_REGEX_PATTERN_STR}$`);

export const USER_SK_PREFIX_STR = `${DELIMITER}DATA`;
export const USER_SK_REGEX_PATTERN_STR = `${USER_SK_PREFIX_STR}${DELIMITER}${USER_ID_REGEX_PATTERN_STR}`;
export const USER_SK_REGEX = new RegExp(`^${USER_SK_REGEX_PATTERN_STR}$`);
