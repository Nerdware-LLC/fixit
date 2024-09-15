import type Stripe from "stripe";

/**
 * Default mock Stripe BillingPortal Session object.
 *
 * @docs https://docs.stripe.com/api/customer_portal/sessions/object
 */
export const mockStripeBillingPortalSession: Stripe.BillingPortal.Session = {
  object: "billing_portal.session",
  id: "bps_TestTestTest",
  configuration: "bpc_TestTestTest",
  created: 1577836800, // 2020-01-01T00:00:00Z
  customer: "cus_TestTestTest",
  livemode: false,
  locale: null,
  on_behalf_of: null,
  return_url: "https://example.com/account",
  url: "https://billing.stripe.com/session/MOCK_SESSION_SECRET",
};
