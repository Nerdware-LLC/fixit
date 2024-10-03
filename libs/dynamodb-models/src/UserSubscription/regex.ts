import { UNIX_TIMESTAMP_REGEX_PATTERN_STR } from "@fixit/timestamp-utils";
import { USER_ID_REGEX_PATTERN_STR } from "../User/regex.js";
import { DELIMITER } from "../_common/delimiter.js";

export const SUB_SK_PREFIX_STR = "SUBSCRIPTION";
export const SUB_SK_REGEX_PATTERN_STR = `${SUB_SK_PREFIX_STR}${DELIMITER}${USER_ID_REGEX_PATTERN_STR}${DELIMITER}${UNIX_TIMESTAMP_REGEX_PATTERN_STR}`;
export const SUB_SK_REGEX = new RegExp(`^${SUB_SK_REGEX_PATTERN_STR}$`);
