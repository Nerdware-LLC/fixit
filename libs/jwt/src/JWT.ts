import {
  sign as jwtSign,
  verify as jwtVerify,
  type JwtPayload,
  type SignOptions,
  type VerifyOptions,
} from "jsonwebtoken";
import { AuthError } from "@fixit/http-errors";

export type BaseJwtPayload = JwtPayload & {
  id?: string;
  [key: string]: unknown;
};

export type SignAndEncodeOptions = SignOptions;

export type ValidateAndDecodeOptions = VerifyOptions & {
  decodeErrMsgs?: Partial<typeof JWT.DEFAULT_DECODE_ERR_MSGS>;
  shouldStripInternalFields?: boolean;
};

/**
 * JSON Web Token base util class for creating and validating JWTs.
 */
export class JWT {
  /**
   * Signs and encodes a JSON Web Token.
   */
  static readonly signAndEncode = (
    payload: BaseJwtPayload,
    privateKey: string,
    options?: SignAndEncodeOptions
  ) => {
    // If `subject` is not provided, try `payload.id`
    const subject = options?.subject ?? payload.id;

    return jwtSign(payload, privateKey, {
      ...(subject && { subject }),
      ...options,
    });
  };

  static readonly DEFAULT_DECODE_ERR_MSGS: {
    [key: string]: string;
    TokenExpiredError: string;
    JsonWebTokenError: string;
    default: string;
  } = {
    TokenExpiredError: "Your token has expired",
    JsonWebTokenError: "Signature verification failed",
    default: "Invalid token",
  };

  /**
   * Validates and decodes a JSON Web Token.
   */
  static readonly validateAndDecode = async <Payload extends BaseJwtPayload>(
    token: string,
    privateKey: string,
    {
      decodeErrMsgs = JWT.DEFAULT_DECODE_ERR_MSGS,
      shouldStripInternalFields = true,
      ...options
    }: ValidateAndDecodeOptions = {}
  ): Promise<Payload> => {
    // Get the raw decoded payload from the JWT
    let decodedPayload = await new Promise<Payload>((resolve, reject) => {
      jwtVerify(token, privateKey, options, (err, decoded) => {
        if (err || !decoded) {
          const errName = err?.name ?? "default";
          const errMsg =
            decodeErrMsgs[errName] ?? decodeErrMsgs.default ?? JWT.DEFAULT_DECODE_ERR_MSGS.default;
          reject(new AuthError(errMsg));
        }
        resolve(decoded as Payload);
      });
    });

    // Strip internal fields from the payload if necessary
    if (shouldStripInternalFields) {
      decodedPayload = this.stripInternalPayloadFields(decodedPayload) as Payload;
    }

    return decodedPayload;
  };

  /**
   * Strips internal JWT payload fields from a given payload.
   */
  static readonly stripInternalPayloadFields = <Payload extends BaseJwtPayload>(
    payload: Payload
  ) => {
    // Filter out the internal JWT fields via destructuring.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iss, sub, aud, exp, nbf, iat, jti, ...strippedPayload } = payload;
    return strippedPayload;
  };
}
