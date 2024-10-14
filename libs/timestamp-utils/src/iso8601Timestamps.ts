import { getValidatorFn, getSanitizerFn } from "@nerdware/ts-string-helpers";

/**
 * Regex pattern string for validating ISO-8601 datetime string timestamps.
 * See {@link ISO_8601_TIMESTAMP_REGEX} for more info.
 */
export const ISO_8601_TIMESTAMP_REGEX_PATTERN_STR =
  "\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)";

/**
 * Regex pattern for validating ISO-8601 datetime string timestamps.
 *
 * ### Relevant Links:
 * - https://www.iso.org/iso-8601-date-and-time-format.html
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 */
export const ISO_8601_TIMESTAMP_REGEX = new RegExp(`^${ISO_8601_TIMESTAMP_REGEX_PATTERN_STR}$`);

/**
 * Returns `true` if the provided `value` is a valid ISO-8601 datetime string timestamp.
 */
export const isValidISO8601Timestamp = getValidatorFn(ISO_8601_TIMESTAMP_REGEX);

/**
 * Removes all characters from the provided string which are not valid in an ISO-8601 datetime string.
 */
export const sanitizeISO8601Timestamp = getSanitizerFn(/[^a-zA-Z0-9:.+-]/g);
