import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { ENV } from "@/server/env";
import { logger } from "@/utils/logger.js";
import type { ErrorOrHttpError } from "@/types/globals.js";
import type { ErrorRequestHandler } from "express";

const DEFAULT_ERROR_MESSAGE = "An unexpected problem occurred";

/**
 * This function serves as the fallback Express error-handler.
 *
 *   1. Parses the provided error object (`originalError`)
 *
 *   2. Logs pertinent info if the error either
 *      - **(a)** has an http `statusCode` of `5xx`, or
 *      - **(b)** does not have a `statusCode` property
 *
 *   3. Sends a JSON error-response to the client
 *      > _**In prod, `5xx` error messages are masked**_
 */
export const errorHandler: ErrorRequestHandler = (originalError: unknown, req, res, next) => {
  // Parse the originalError param
  const error = getTypeSafeError(originalError, { fallBackErrMsg: DEFAULT_ERROR_MESSAGE });

  const { statusCode: errorStatusCode = 500 } = error as ErrorOrHttpError;
  let { message: errorMessage } = error;

  if (errorStatusCode >= 500) {
    logger.error({ req, originalError }, `SERVER ERROR on route "${req.originalUrl}"`);
    // Mask 5xx error messages in production
    if (ENV.IS_PROD) errorMessage = DEFAULT_ERROR_MESSAGE;
  }

  // If streaming back to the client has already been initiated, use Express's built-in default-error-handler.
  if (res.headersSent) return next(originalError);

  // Send JSON response to client
  res.status(errorStatusCode).json({ error: errorMessage });
};
