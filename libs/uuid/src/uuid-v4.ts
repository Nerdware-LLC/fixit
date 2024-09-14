import { v4 as uuidv4, version as uuidVersion } from "uuid";
import { isValidUUID } from "./common.js";

/**
 * Generates a random v4 UUID string (_**the result is not reproducible**_).
 */
export const getRandomUUIDv4 = () => uuidv4();

/**
 * Checks if the provided `value` is a valid **v4** UUID string.
 */
export const isValidUUIDv4 = (value: unknown) => isValidUUID(value) && uuidVersion(value) === 4;
