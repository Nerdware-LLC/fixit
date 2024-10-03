import { DELIMITER } from "../_common/delimiter.js";

export const PW_RESET_TOKEN_SK_PREFIX_STR = "PW_RESET_TOKEN";
export const PW_RESET_TOKEN_SK_REGEX_PATTERN_STR = `${PW_RESET_TOKEN_SK_PREFIX_STR}${DELIMITER}[a-f0-9]{96}`;
export const PW_RESET_TOKEN_SK_REGEX = new RegExp(`^${PW_RESET_TOKEN_SK_REGEX_PATTERN_STR}$`);
