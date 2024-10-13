import { isString, safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { createScalarGraphQLError } from "./createScalarGraphQLError.js";
import type { GraphQLErrorOptions } from "graphql";
import type { StringValidationParams } from "./createValidatedStringScalar.js";

/**
 * A helper function to validate a string value for custom scalars.
 */
export const getValidatedStringValue = (
  { scalarName, sanitize, isValid }: StringValidationParams,
  value: unknown,
  gqlErrorOpts: GraphQLErrorOptions = {}
): string => {
  if (!isString(value))
    throw createScalarGraphQLError(
      scalarName,
      `the provided value is not a string: ${safeJsonStringify(value)} (typeof ${typeof value})`,
      gqlErrorOpts
    );

  const sanitizedStr = sanitize(value);

  if (!isValid(sanitizedStr))
    throw createScalarGraphQLError(
      scalarName,
      `the provided string value is not in the required format: "${safeJsonStringify(value)}"`,
      gqlErrorOpts
    );

  return sanitizedStr;
};
