import type { Simplify } from "type-fest";

/**
 * Recursively removes `undefined` from all properties of an object.
 *
 * This type is useful for "fixing" 3rd party types that were designed in a way
 * that doesn't play well with the `exactOptionalPropertyTypes:true` tsconfig.
 *
 * @example
 * ```ts
 * type FooObject = {
 *   a: string;
 *   b?: string | null | undefined;
 *   c?: {
 *     d: string;
 *     e?: string | null | undefined;
 *   };
 * };
 *
 * type RESULT = ExcludeUndefinedDeep<FooObject>;
 * /* Type RESULT is equivalent to:
 *    {
 *      a: string;
 *      b?: string | null;
 *      c?: {
 *        d: string;
 *        e?: string | null;
 *      };
 *    }
 * ```
 */
export type ExcludeUndefinedDeep<T> = {
  [Key in keyof T]: Exclude<T[Key], undefined> extends infer V
    ? V extends Record<string, unknown>
      ? Simplify<ExcludeUndefinedDeep<V>>
      : V
    : never;
};
