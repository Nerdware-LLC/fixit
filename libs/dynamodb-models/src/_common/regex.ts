/**
 * Regex pattern string for a valid handle.
 */
export const HANDLE_REGEX_PATTERN_STR: string = `@[a-zA-Z0-9_]{3,50}`;

/**
 * Regex pattern string for using UUIDs in compound attribute regex.
 *
 * Regex source: https://github.com/uuidjs/uuid/blob/6dcb15b86357afdf29ae2dabf5b2a8afab83c2c0/src/regex.js
 */
export const UUID_REGEX_PATTERN_STR: string = `(?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)`;
