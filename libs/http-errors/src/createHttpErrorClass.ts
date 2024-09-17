import { getErrorMessage } from "@nerdware/ts-type-safety-utils";
import { logger } from "@fixit/node-logger";
import type { GqlErrorExtensions } from "@fixit/api-schemas/GraphQL/types";
import type { Class } from "type-fest";

/**
 * Factory function for "HttpError" classes which extend {@link Error}.
 */
export const createHttpErrorClass = ({
  name,
  statusCode,
  defaultErrorMsg,
  gqlErrorExtensions,
}: HttpErrorClassParams) => {
  const NewClass = class HttpError extends Error implements BaseHttpError {
    override readonly name: string = name; // 'name' is overridden to make it readonly
    readonly statusCode: number = statusCode;
    readonly defaultErrorMsg: string = defaultErrorMsg;
    readonly gqlErrorExtensions: Required<GqlErrorExtensions> = gqlErrorExtensions;

    constructor(message?: unknown) {
      super(getErrorMessage(message) || defaultErrorMsg);
      Error.captureStackTrace(this, HttpError);
      if (statusCode >= 500) logger.error(this);
    }
  };

  return NewClass satisfies Class<Error, [message?: unknown]>;
};

/**
 * Base type for custom errors with HTTP status codes.
 */
export type BaseHttpError = Error & HttpErrorClassParams;

/**
 * Params needed to create an HttpError class.
 */
export type HttpErrorClassParams = {
  readonly name: string;
  readonly statusCode: number;
  readonly defaultErrorMsg: string;
  readonly gqlErrorExtensions: Required<GqlErrorExtensions>;
};
