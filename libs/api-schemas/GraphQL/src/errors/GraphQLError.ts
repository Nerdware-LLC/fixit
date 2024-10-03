import type { GraphQLFormattedError } from "graphql";
import type { Merge } from "type-fest";

/**
 * A {@link GraphQLFormattedError} with the app's {@link GraphQLErrorCustomExtensions}.
 */
export type GraphQLFormattedErrorWithExtensions = Merge<
  GraphQLFormattedError,
  { extensions: GraphQLErrorCustomExtensions }
>;

/** Alias of {@link GraphQLErrorCustomExtensions}. */
export type GraphQLErrorExtensions = GraphQLErrorCustomExtensions;

/**
 * GraphQLError custom extensions for client responses.
 *
 * See https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors
 */
export type GraphQLErrorCustomExtensions = {
  code: GraphQLErrorCode;
  http: GraphQLErrorCustomHttpExtension | null;
};

/**
 * GraphQLError custom `http` extension for providing client error responses
 * with traditional HTTP error status codes (`extensions.http.status`).
 */
export type GraphQLErrorCustomHttpExtension = {
  /**
   * The {@link GraphQLErrorHttpStatusCode|HTTP status code} for the error.
   * - `400` — Bad User Input
   * - `401` — Authentication Required
   * - `402` — Payment Required
   * - `403` — Forbidden
   * - `404` — Resource Not Found
   * - `500` — Internal Server Error
   */
  status: number;
};

/**
 * GraphQLError `extensions.code` values for client error responses.
 */
export type GraphQLErrorCode = GraphQLErrorStatusCodeMap[GraphQLErrorHttpStatusCode];

/**
 * GraphQLError `extensions.http.status` values for client error responses.
 */
export type GraphQLErrorHttpStatusCode = keyof GraphQLErrorStatusCodeMap;

/**
 * A map of HTTP error status codes to their corresponding GraphQLError `extensions.code` values.
 *
 * **Note:** The following codes are [ApolloServer builtins][apollo-error-codes]:
 * - `BAD_USER_INPUT` (400)
 * - `INTERNAL_SERVER_ERROR` (500)
 *
 * [apollo-error-codes]: https://github.com/apollographql/apollo-server/blob/268687db591fed8293eeded1546ae2f8e6f2b6a7/packages/server/src/errors/index.ts
 */
type GraphQLErrorStatusCodeMap = Readonly<{
  /** The GraphQLError `extensions.code` value for 400-status errors. */
  400: "BAD_USER_INPUT";
  /** The GraphQLError `extensions.code` value for 401-status errors. */
  401: "AUTHENTICATION_REQUIRED";
  /** The GraphQLError `extensions.code` value for 402-status errors. */
  402: "PAYMENT_REQUIRED";
  /** The GraphQLError `extensions.code` value for 403-status errors. */
  403: "FORBIDDEN";
  /** The GraphQLError `extensions.code` value for 404-status errors. */
  404: "RESOURCE_NOT_FOUND";
  /** The GraphQLError `extensions.code` value for 500-status errors. */
  500: "INTERNAL_SERVER_ERROR";
}>;
