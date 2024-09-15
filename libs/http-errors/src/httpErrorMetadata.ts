import { ApolloServerErrorCode } from "@apollo/server/errors";
import type { HttpErrorClassParams } from "./createHttpErrorClass.js";

/**
 * Map of HTTP error status codes to metadata objects for each one.
 *
 * **Note:** This object only contains HTTP error status codes that are
 *           actually used/implemented by Fixit apps/libs/tools/etc.
 */
export const HTTP_ERROR_METADATA: {
  readonly 400: HttpErrorClassParams;
  readonly 401: HttpErrorClassParams;
  readonly 402: HttpErrorClassParams;
  readonly 403: HttpErrorClassParams;
  readonly 404: HttpErrorClassParams;
  readonly 500: HttpErrorClassParams;
  readonly [statusCode: number]: HttpErrorClassParams; // Allow lookups using any `number` key
} = {
  400: {
    name: "UserInputError",
    statusCode: 400,
    defaultErrorMsg: "Invalid user input",
    gqlErrorExtensions: {
      code: ApolloServerErrorCode.BAD_USER_INPUT,
      http: { status: 400 },
    },
  },
  401: {
    name: "AuthError",
    statusCode: 401,
    defaultErrorMsg: "Authentication required",
    gqlErrorExtensions: {
      code: "AUTHENTICATION_REQUIRED",
      http: { status: 401 },
    },
  },
  402: {
    name: "PaymentRequiredError",
    statusCode: 402,
    defaultErrorMsg: "Payment required",
    gqlErrorExtensions: {
      code: "PAYMENT_REQUIRED",
      http: { status: 402 },
    },
  },
  403: {
    name: "ForbiddenError",
    statusCode: 403,
    defaultErrorMsg: "Forbidden",
    gqlErrorExtensions: {
      code: "FORBIDDEN",
      http: { status: 403 },
    },
  },
  404: {
    name: "NotFoundError",
    statusCode: 404,
    defaultErrorMsg: "Unable to find the requested resource",
    gqlErrorExtensions: {
      code: "RESOURCE_NOT_FOUND",
      http: { status: 404 },
    },
  },
  500: {
    name: "InternalServerError",
    statusCode: 500,
    defaultErrorMsg: "An unexpected error occurred",
    gqlErrorExtensions: {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      http: { status: 500 },
    },
  },
};
