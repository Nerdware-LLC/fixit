import { getCombinedRegex, type RegexComponent } from "@fixit/ts-regex-utils";
import { DELIMITER } from "./delimiter.js";

/**
 * Returns a `RegExp` object that can be used to validate a compound attribute value.
 * > _This app uses `"#"` as the delimeter for compound attribute field values._
 */
export const getCompoundAttrRegex = (
  regexComponents: Array<RegexComponent>,
  { regexFlags = "" }: { regexFlags?: string } = {}
): RegExp => getCombinedRegex(regexComponents, { delimiter: DELIMITER, regexFlags });

/**
 * Converts an ordered array of values into a compound attribute string.
 *
 * > If a value is `null` or `undefined`, it is treated as an empty string.
 * >
 * > If the values may include problematic characters like spaces or `#` characters (the delimeter),
 * > set `shouldUrlEncode` to `true` to encode the values using `encodeURIComponent`.
 */
export const getCompoundAttrString = (
  orderedValues: Array<string | null | undefined>,
  { shouldUrlEncode = false }: { shouldUrlEncode?: boolean } = {}
) => {
  return orderedValues
    .map(
      // prettier-ignore
      shouldUrlEncode
        ? (value) => (value ? encodeURIComponent(value) : "")
        : (value) => value ?? ""
    )
    .join(DELIMITER);
};

/**
 * Converts a compound attribute string into an ordered array of string values.
 *
 * > Set `shouldUrlDecode` to `true` to decode the values using `decodeURIComponent`.
 */
export const parseCompoundAttrString = (
  compoundAttrStr: string,
  { shouldUrlDecode = false }: { shouldUrlDecode?: boolean } = {}
) => {
  const orderedValues = compoundAttrStr.split(DELIMITER);
  return shouldUrlDecode
    ? orderedValues.map((value) => (value ? decodeURIComponent(value) : ""))
    : orderedValues;
};
