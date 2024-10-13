import { GraphQLError, type GraphQLErrorOptions } from "graphql";
import type { GraphQLErrorExtensions } from "../../errors/GraphQLError.js";

/**
 * Creates a `GraphQLError` for invalid scalar values.
 */
export const createScalarGraphQLError = (
  scalarName: string,
  problem: string,
  options?: GraphQLErrorOptions
) => {
  return new GraphQLError(`Invalid ${scalarName} — ${problem}`, {
    ...(options ?? {}),
    extensions: {
      code: "BAD_USER_INPUT",
      ...(options?.extensions ?? {}),
      http: {
        status: 400,
        ...(options?.extensions?.http ?? {}),
      },
    } satisfies GraphQLErrorExtensions,
  });
};
