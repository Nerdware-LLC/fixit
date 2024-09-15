import { createHttpErrorClass, type BaseHttpError } from "./createHttpErrorClass.js";
import { HTTP_ERROR_METADATA } from "./httpErrorMetadata.js";

export { HTTP_ERROR_METADATA };
export type { BaseHttpError };

/**
 * {@link BaseHttpError|HttpError} for requests containing invalid user input.
 * - HTTP status code: `400`
 */
export const UserInputError = createHttpErrorClass({ ...HTTP_ERROR_METADATA[400] });

/**
 * {@link BaseHttpError|HttpError} for requests lacking requisite authentication credentials.
 * - HTTP status code: `401`
 */
export const AuthError = createHttpErrorClass({ ...HTTP_ERROR_METADATA[401] });

/**
 * {@link BaseHttpError|HttpError} for requests rejected due to lack of payment.
 * - HTTP status code: `402`
 */
export const PaymentRequiredError = createHttpErrorClass({ ...HTTP_ERROR_METADATA[402] });

/**
 * {@link BaseHttpError|HttpError} for forbidden/unauthorized requests.
 * - HTTP status code: `403`
 */
export const ForbiddenError = createHttpErrorClass({ ...HTTP_ERROR_METADATA[403] });

/**
 * {@link BaseHttpError|HttpError} for requests to non-existent endpoints.
 * - HTTP status code: `404`
 */
export const NotFoundError = createHttpErrorClass({ ...HTTP_ERROR_METADATA[404] });

/**
 * {@link BaseHttpError|HttpError} for requests that fail due to unexpected server errors.
 * - HTTP status code: `500`
 */
export const InternalServerError = createHttpErrorClass({ ...HTTP_ERROR_METADATA[500] });
