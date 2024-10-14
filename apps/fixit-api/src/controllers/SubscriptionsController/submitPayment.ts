import { sanitizeAlphabetic } from "@nerdware/ts-string-helpers";
import { isString } from "@nerdware/ts-type-safety-utils";
import { z as zod } from "zod";
import { getStringTransformer } from "@fixit/api-schemas/GraphQL/validation/helpers/getStringTransformer.js";
import { SUBSCRIPTION_ENUMS } from "@fixit/dynamodb-models/UserSubscription";
import { promoCodesCache } from "@fixit/stripe-client/caches/promoCodesCache.js";
import { isValidStripeID, sanitizeStripeID } from "@fixit/stripe-client/helpers";
import { ApiController } from "@/controllers/ApiController.js";
import { AuthService } from "@/services/AuthService/index.js";
import { CheckoutService } from "@/services/CheckoutService/index.js";

/**
 * This controller returns
 *
 * > Endpoint: `POST /api/subscriptions/submit-payment`
 */
export const submitPayment = ApiController<"/subscriptions/submit-payment">(
  // Req body schema:
  zod.object({
    selectedSubscription: zod.enum(SUBSCRIPTION_ENUMS.PRICE_NAMES),
    paymentMethodID: zod.string().transform(
      getStringTransformer({
        fieldDescription: "paymentMethodID",
        sanitize: sanitizeStripeID,
        isValid: isValidStripeID.paymentMethod,
      })
    ),
    promoCode: zod
      .string()
      .optional()
      .transform(
        getStringTransformer({
          fieldDescription: "promoCode",
          sanitize: sanitizeAlphabetic,
          isValid: (value) => isString(value) && promoCodesCache.has(value),
        })
      ),
  }),
  // Controller logic:
  async (req, res) => {
    // Validate and decode the AuthToken from the 'Authorization' header:
    const authenticatedUser = await AuthService.authenticateUser.viaAuthHeaderToken(req);

    // Get the provided args:
    const { paymentMethodID, selectedSubscription, promoCode } = req.body;

    // Get the Stripe link:
    const { checkoutCompletionInfo, subscription } = await CheckoutService.processPayment({
      user: authenticatedUser,
      selectedSubscription,
      paymentMethodID,
      promoCode,
      request: {
        ip: req.ip!,
        userAgent: req.get("User-Agent")!,
      },
    });

    // Update the user's AuthToken with new subscription info:
    const newAuthToken = AuthService.createAuthToken({ ...authenticatedUser, subscription });

    // Send response:
    res.status(201).json({
      checkoutCompletionInfo,
      token: newAuthToken.toString(),
    });
  }
);
