import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { GraphQLScalarType, Kind, type GraphQLScalarTypeConfig, type ValueNode } from "graphql";
import { createScalarGraphQLError } from "./createScalarGraphQLError.js";
import { getValidatedStringValue } from "./getValidatedStringValue.js";
import type { Except, Simplify } from "type-fest";

/**
 * Params related to validating string scalar values.
 */
export type StringValidationParams = {
  scalarName: string;
  sanitize: (value: string) => string;
  isValid: (value: unknown) => boolean;
};

/**
 * Params for {@link createStringIDScalar}.
 */
export type CreateValidatedStringScalarParams = Simplify<
  StringValidationParams &
    Except<
      GraphQLScalarTypeConfig<string | null, string | null>,
      "name" | "parseValue" | "parseLiteral" | "serialize"
    >
>;

/**
 * Creates a `GraphQLScalarType` with sanitization and validation for string values.
 */
export const createValidatedStringScalar = ({
  scalarName,
  description = `A ${scalarName} scalar which implements sanitization and validation for string values of this type.`,
  sanitize,
  isValid,
  ...gqlScalarParams
}: CreateValidatedStringScalarParams) => {
  // Create a new GraphQL scalar type
  const gqlScalarType = new GraphQLScalarType<string | null>({
    name: scalarName,
    description,
    ...gqlScalarParams,

    // process values from the client
    parseValue: (value: unknown) => {
      return value
        ? getValidatedStringValue({ scalarName, sanitize, isValid }, value)
        : null; // prettier-ignore
    },

    // process values from the client in AST form (note: `ast.value` is always in string format)
    parseLiteral: (ast: ValueNode) => {
      if (ast.kind !== Kind.STRING) {
        throw createScalarGraphQLError(
          scalarName,
          `the provided AST value is not a string: "${ast.kind}"`,
          { nodes: ast }
        );
      }

      return ast.value
        ? getValidatedStringValue({ scalarName, sanitize, isValid }, ast.value, { nodes: ast })
        : null;
    },

    // process values sent to the client
    serialize: (value: unknown) => {
      if (!value) return null;

      if (!isValid(value)) {
        throw createScalarGraphQLError(
          scalarName,
          `the value is not in the required format: ${safeJsonStringify(value)}`
        );
      }

      return value as string;
    },
  });

  // Add the `sanitize` and `isValid` functions to the returned scalar type
  Object.defineProperties(gqlScalarType, {
    sanitize: { value: sanitize, enumerable: false, writable: false, configurable: false },
    isValid: { value: isValid, enumerable: false, writable: false, configurable: false },
  });

  return gqlScalarType as typeof gqlScalarType &
    Pick<StringValidationParams, "sanitize" | "isValid">;
};
