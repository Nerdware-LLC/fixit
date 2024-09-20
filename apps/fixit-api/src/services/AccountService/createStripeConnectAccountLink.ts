import { stripe } from "@fixit/stripe-client";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";

/**
 * ### AccountService: createStripeConnectAccountLink
 *
 * @returns a Stripe AccountLink object.
 */
export const createStripeConnectAccountLink = async ({
  authenticatedUser,
  returnURL,
}: {
  authenticatedUser: AuthTokenPayload;
  returnURL: string;
}) => {
  return await stripe.accountLinks.create({
    account: authenticatedUser.stripeConnectAccount.id,
    return_url: `${returnURL}?connect-return`,
    refresh_url: `${returnURL}?connect-refresh`,
    type: "account_onboarding",
  });
};
