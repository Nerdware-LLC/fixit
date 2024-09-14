import { isString } from "@nerdware/ts-type-safety-utils";

/**
 * Checks if the provided `value` is a valid UUID string _**of any version**_.
 */
export const isValidUUID = (value: unknown): value is string => {
  return isString(value) && UUID_REGEX.test(value);
};

/**
 * Regex for validating UUID strings.
 * @source https://github.com/uuidjs/uuid/blob/6dcb15b86357afdf29ae2dabf5b2a8afab83c2c0/src/regex.js
 */
export const UUID_REGEX =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
