import type { ZodType, ZodObject } from "zod";

/**
 * Create a {@link ZodObject} type that matches an existing `Record`-type `T`.
 */
export type ZodObjectWithShape<T extends Record<string, unknown>> = ZodObject<ZodShape<T>>;

/**
 * Maps an existing `Record`-type `T` to an object with
 * - all keys required, and
 * - all values wrapped by {@link ZodType}
 */
export type ZodShape<T extends Record<string, unknown>> = {
  [Key in keyof T]-?: ZodType<T[Key]>;
};
