import type { GraphQLFormattedError } from "graphql";
import type { Except, Merge } from "type-fest";
import type {
  GraphQLErrorCustomExtensions,
  GraphQLErrorCustomHttpExtension,
} from "./__codegen__/graphqlSchemaTypes.js";

/**
 * {@link GraphQLErrorCustomExtensions} without the `__typename` field.
 */
export type GqlErrorCustomExtensions = Except<GraphQLErrorCustomExtensions, "__typename">;

/**
 * Alias of {@link GqlErrorCustomExtensions}.
 */
export type GqlErrorExtensions = GqlErrorCustomExtensions;

/**
 * {@link GraphQLErrorCustomHttpExtension} without the `__typename` field.
 */
export type GqlErrorCustomHttpExtension = Except<GraphQLErrorCustomHttpExtension, "__typename">;

/**
 * A {@link GraphQLFormattedError} with the app's {@link GqlErrorCustomExtensions}.
 */
export type GraphQLFormattedErrorWithExtensions = Merge<
  GraphQLFormattedError,
  {
    extensions: GqlErrorCustomExtensions;
  }
>;
