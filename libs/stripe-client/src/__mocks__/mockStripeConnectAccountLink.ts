import type Stripe from "stripe";

/**
 * Default mock Stripe Connect AccountLink object.
 *
 * @docs https://docs.stripe.com/api/account_links/object
 */
export const mockStripeConnectAccountLink: Stripe.AccountLink = {
  object: "account_link",
  created: 1577836800, //    2020-01-01T00:00:00Z
  expires_at: 1577837100, // 2020-01-01T00:00:00Z + 300 seconds
  url: "https://connect.stripe.com/setup/s/acct_TestTestTest/xIONN0QVMYbQ",
};
