import { safeJsonStringify, isDate } from "@nerdware/ts-type-safety-utils";
import { GraphQLScalarType, Kind } from "graphql";
import {
  isValidISO8601Timestamp,
  sanitizeISO8601Timestamp,
} from "@fixit/timestamp-utils/iso8601Timestamps.js";
import { createScalarGraphQLError } from "./helpers/createScalarGraphQLError.js";
import { getValidatedStringValue } from "./helpers/getValidatedStringValue.js";
import type { StringValidationParams } from "./helpers/createValidatedStringScalar.js";

const DATETIME_SCALAR_NAME = "DateTime";

const isoDateTimeStringValidationParams: StringValidationParams = {
  scalarName: DATETIME_SCALAR_NAME,
  sanitize: sanitizeISO8601Timestamp,
  isValid: isValidISO8601Timestamp,
};

export const DateTimeGraphQLScalar = new GraphQLScalarType<Date | null, string | null>({
  name: DATETIME_SCALAR_NAME,
  description:
    `A DateTime scalar which converts ISO-8601 date-time strings into Date objects, ` +
    `and vice versa. Example ISO-8601 date-time string: "2020-12-01T15:47:43.283Z".`,
  specifiedByURL: "https://www.iso.org/iso-8601-date-and-time-format.html",

  // process values from the client
  parseValue: (value: unknown) => {
    if (!value) return null;
    const isoDateTimeStr = getValidatedStringValue(isoDateTimeStringValidationParams, value);
    return new Date(isoDateTimeStr);
  },

  // process values from the client in AST form (note: `ast.value` is always in string format)
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING)
      throw createScalarGraphQLError(
        DATETIME_SCALAR_NAME,
        `the provided AST value is not a string: "${ast.kind}"`,
        { nodes: ast }
      );

    if (!ast.value) return null;

    const isoDateTimeStr = getValidatedStringValue(
      isoDateTimeStringValidationParams,
      ast.value,
      { nodes: ast } // pass the AST nodes for better validation error messages
    );

    return new Date(isoDateTimeStr);
  },

  // process values sent to the client
  serialize: (value: unknown) => {
    if (!value) return null;

    if (!isDate(value))
      throw createScalarGraphQLError(
        DATETIME_SCALAR_NAME,
        `the value is not a Date object: ${safeJsonStringify(value)} (typeof ${typeof value})`
      );

    return value.toISOString();
  },
});
