import { isPlainObject, isString } from "@nerdware/ts-type-safety-utils";
import type { RegexComponent } from "./types.js";

/**
 * Formats an individual {@link RegexComponent|component} of a larger regex pattern.
 * The following modifications are made to the provided regex pattern:
 *
 * - Removes any `^` and `$` position assertions
 * - If the provided `regexComponent` is a config object with `required: false`, the regex
 *   pattern is grouped with a `?` quantifier.
 */
export const formatRegexComponent = (regexComponent: RegexComponent): string => {
  const { regex, required } = isPlainObject(regexComponent)
    ? regexComponent
    : { regex: regexComponent, required: true };

  // Get the regex pattern source
  let source = isString(regex) ? regex : regex.source;

  // Remove any `^` and `$` position assertions
  source = source.replace(/(^\^?|\$?$)/g, "");
  // If the component is optional, group it with a `?` quantifier
  if (!required) source = `(${source})?`;

  return source;
};

/**
 * Combines multiple regex patterns into a single `RegExp` object.
 * @returns A `RegExp` object that reflects a combination of the provided `regexComponents` patterns.
 * @example
 * ```ts
 * getCombinedRegex( // This example would return /^foo#bar#(baz)?$/i
 *   [
 *     '^foo$', // <-- `^` and `$` position assertions are removed
 *     /bar/u, //  <-- flags are ignored
 *     {
 *       regex: 'baz', //   <-- can be RegExp or string
 *       required: false // <-- optional regex component
 *     }
 *   ],
 *   'i'
 * ); // => /^foo#bar#(baz)?$/i
 * ```
 */
export const getCombinedRegex = (
  /**
   * An array of `RegExp` objects, regex-pattern strings, and/or regex-pattern config objects which
   * include a regex pattern and a `required` flag. They must be provided in the desired order.
   * > **Usage Notes:**
   * > - If a provided `RegExp` object has flags, they are ignored.
   * > - Any `^` and/or `$` position assertions are removed.
   * > - To have a component be optional, provide a config object with a `required: false` flag.
   */
  regexComponents: Array<RegexComponent>,
  {
    delimiter = "",
    regexFlags = "",
  }: {
    /** The delimiter to use between each regex component. Defaults to an empty string. */
    delimiter?: string;
    /** Optional flags to pass to the `RegExp` constructor. */
    regexFlags?: string;
  } = {}
): RegExp => {
  const regexSourceStrings = regexComponents.map(formatRegexComponent);
  return new RegExp(`^${regexSourceStrings.join(delimiter)}$`, regexFlags);
};
