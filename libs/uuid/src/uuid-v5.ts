import { v5 as uuidv5, version as uuidVersion } from "uuid";
import { isValidUUID } from "./common.js";

const { UUID_NAMESPACE } = process.env; // eslint-disable-line n/no-process-env

if (!UUID_NAMESPACE) throw new Error("Missing required environment variable");

/**
 * Generates a reproducible v5 UUID string using the provided `input` and the app's UUID namespace.
 */
export const getUUIDv5 = (input: string) => uuidv5(input, UUID_NAMESPACE);

/**
 * Checks if the provided `value` is a valid **v5** UUID string.
 */
export const isValidUUIDv5 = (value: unknown) => isValidUUID(value) && uuidVersion(value) === 5;
