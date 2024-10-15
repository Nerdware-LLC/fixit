import {
  sanitizeEmail,
  isValidEmail,
  sanitizePassword,
  isValidPassword,
  sanitizeJWT,
  isValidJWT,
} from "@nerdware/ts-string-helpers";
import { hasKey } from "@nerdware/ts-type-safety-utils";
import { z as zod } from "zod";
import { getStringTransformer } from "@fixit/api-schemas/GraphQL/validation/helpers.js";
import { ApiController } from "@/controllers/ApiController.js";
import { AuthService } from "@/services/AuthService/index.js";
import type { ParsedGoogleOAuth2IDTokenFields } from "@/services/AuthService/GoogleOAuth2IDToken.js";

/**
 * The Zod schema for the request body of the `/auth/login` endpoint.
 */
export const loginReqBodyZodSchema = zod
  .object({
    email: zod
      .string()
      .toLowerCase()
      .transform(
        getStringTransformer({
          fieldDescription: "email",
          sanitize: sanitizeEmail,
          isValid: isValidEmail,
        })
      ),
    password: zod
      .string()
      .optional()
      .transform(
        getStringTransformer({
          fieldDescription: "password",
          sanitize: sanitizePassword,
          isValid: isValidPassword,
        })
      ),
    googleIDToken: zod
      .string()
      .optional()
      .transform(
        getStringTransformer({
          fieldDescription: "googleIDToken",
          sanitize: sanitizeJWT,
          isValid: isValidJWT,
        })
      ),
    expoPushToken: zod
      .string()
      .optional()
      .transform(
        getStringTransformer({
          fieldDescription: "expoPushToken",
          sanitize: sanitizeJWT,
          isValid: isValidJWT,
        })
      ),
  })
  .refine(
    // Require either a `password` or `googleIDToken`:
    (reqBody) => hasKey(reqBody, "password") || hasKey(reqBody, "googleIDToken"),
    { message: "Invalid login credentials" }
  );

/**
 * This controller method logs in a user.
 *
 * > Endpoint: `POST /api/auth/login`
 */
export const login = ApiController<"/auth/login">(
  // Req body schema:
  loginReqBodyZodSchema,
  // Controller logic:
  async (req, res) => {
    const { email, password, googleIDToken, expoPushToken } = req.body;

    // If a `googleIDToken` is provided, parse it:
    const { googleID }: Partial<ParsedGoogleOAuth2IDTokenFields> = googleIDToken
      ? await AuthService.parseGoogleOAuth2IDToken(googleIDToken)
      : {};

    // Authenticate the user:
    const authenticatedUser = await AuthService.authenticateUser.viaLoginCredentials({
      email,
      password,
      googleID,
    });

    // Pre-fetch User items:
    const { userItems, userSubscription, userStripeConnectAccount } =
      await AuthService.preFetchAndSyncUserItems({
        authenticatedUserID: authenticatedUser.id,
        expoPushToken,
      });

    // Create a new AuthToken for the user:
    const authToken = AuthService.createAuthToken({
      ...authenticatedUser,
      subscription: userSubscription,
      stripeConnectAccount: userStripeConnectAccount,
    });

    // Send response:
    res.status(200).json({
      token: authToken.toString(),
      userItems,
    });
  }
);
