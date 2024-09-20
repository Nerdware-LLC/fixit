import { stripe } from "@fixit/stripe-client";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";

/**
 * ### AccountService: createCustomerBillingPortalLink
 *
 * @returns a Stripe BillingPortal.Session object.
 */
export const createCustomerBillingPortalLink = async ({
  authenticatedUser,
  returnURL,
}: {
  authenticatedUser: AuthTokenPayload;
  returnURL: string;
}) => {
  return await stripe.billingPortal.sessions.create({
    customer: authenticatedUser.stripeCustomerID,
    return_url: returnURL,
  });
};
