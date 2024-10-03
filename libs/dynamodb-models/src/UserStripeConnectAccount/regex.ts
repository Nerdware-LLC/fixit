import { USER_ID_REGEX_PATTERN_STR } from "../User/regex.js";
import { DELIMITER } from "../_common/delimiter.js";

export const SCA_SK_PREFIX_STR = "STRIPE_CONNECT_ACCOUNT";
export const SCA_SK_REGEX_PATTERN_STR = `${SCA_SK_PREFIX_STR}${DELIMITER}${USER_ID_REGEX_PATTERN_STR}`;
export const SCA_SK_REGEX = new RegExp(`^${SCA_SK_REGEX_PATTERN_STR}$`);
