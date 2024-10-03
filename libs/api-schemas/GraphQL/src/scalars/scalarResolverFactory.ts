import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { GraphQLScalarType, type GraphQLScalarTypeConfig } from "graphql";
import type { Simplify } from "type-fest";

// FIXME delete this file if the new gql-codgegen stuff works out.

/**
 * Creates a standardized error message for invalid scalar values.
 */
const getScalarErrorMsg = (scalarType: string, invalidValue: unknown) => {
  return (
    `[${scalarType.toUpperCase()} SCALAR ERROR]: ` +
    `Client provided an invalid ${scalarType.toLowerCase()}: ` +
    safeJsonStringify(invalidValue)
  );
};

/**
 * Params for {@link scalarResolverFactory}.
 */
type ScalarResolverFactoryParams<TInternal = unknown, TExternal = TInternal> = Simplify<
  GraphQLScalarTypeConfig<TInternal, TExternal> & {
    /** A function that returns true if the value is valid for the scalar type. */
    isValid?: (value: unknown) => boolean;
  }
>;

/**
 * Factory function for creating a resolver for a custom scalar type.
 */
export const scalarResolverFactory = <TInternal, TExternal = TInternal>({
  name,
  parseValue,
  serialize,
  isValid,
  ...configs
}: ScalarResolverFactoryParams<TInternal, TExternal>) => {
  // If `parseValue` was not provided, but `isValid` was, then use it in default `parseValue` fn.
  if (!parseValue && isValid) {
    // parseValue = value from the client
    parseValue = (value: unknown) => {
      if (!isValid(value)) throw new TypeError(getScalarErrorMsg(name, value));
      return value as TInternal;
    };
  }

  // If `serialize` was not provided, but `isValid` was, then use it in default `serialize` fn.
  if (!serialize && isValid) {
    // serialize = value sent to the client
    serialize = (value: unknown) => {
      if (!isValid(value)) throw new TypeError(getScalarErrorMsg(name, value));
      return value as TExternal;
    };
  }

  return new GraphQLScalarType({
    name,
    ...(parseValue && { parseValue }),
    ...(serialize && { serialize }),
    ...configs,
  });
};
