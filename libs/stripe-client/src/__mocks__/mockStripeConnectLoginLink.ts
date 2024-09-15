import type Stripe from "stripe";

/**
 * Default mock Stripe Connect LoginLink object.
 *
 * @docs https://docs.stripe.com/api/accounts/login_link/object
 */
export const mockStripeConnectLoginLink: Stripe.LoginLink = {
  object: "login_link",
  created: 1577836800, // 2020-01-01T00:00:00Z
  url: "https://connect.stripe.com/express/acct_TestTestTest/3xlM9Ctj03Tw",
};
