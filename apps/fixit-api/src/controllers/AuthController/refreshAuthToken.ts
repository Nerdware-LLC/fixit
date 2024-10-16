import { sanitizeJWT, isValidJWT } from "@nerdware/ts-string-helpers";
import { z as zod } from "zod";
import { getStringTransformer } from "@fixit/api-schemas/GraphQL/validation/helpers.js";
import { ApiController } from "@/controllers/ApiController.js";
import { AuthService } from "@/services/AuthService/index.js";

/**
 * This controller refreshes a user's AuthToken (if valid).
 *
 * > Endpoint: `POST /api/auth/token`
 */
export const refreshAuthToken = ApiController<"/auth/token">(
  // Req body schema:
  zod.object({
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
  }),
  // Controller logic:
  async (req, res) => {
    // Validate and decode the AuthToken from the 'Authorization' header:
    const authenticatedUser = await AuthService.authenticateUser.viaAuthHeaderToken(req);

    // Pre-fetch User items:
    const { userItems, userSubscription, userStripeConnectAccount } =
      await AuthService.preFetchAndSyncUserItems({
        authenticatedUserID: authenticatedUser.id,
        expoPushToken: req.body?.expoPushToken,
      });

    // Create a new AuthToken for the user:
    const newAuthToken = AuthService.createAuthToken({
      ...authenticatedUser,
      subscription: userSubscription,
      stripeConnectAccount: userStripeConnectAccount,
    });

    // Send response:
    res.status(200).json({
      token: newAuthToken.toString(),
      userItems,
    });
  }
);
