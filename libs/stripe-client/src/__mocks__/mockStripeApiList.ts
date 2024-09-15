import type Stripe from "stripe";

/**
 * Returns a mock Stripe ApiList object.
 */
export const mockStripeApiList = <Data extends Record<string, any>>(
  data: Data | Array<Data>,
  url: string = "https://api.stripe.com/v1/test"
): Stripe.ApiList<Data> => ({
  object: "list",
  has_more: false,
  data: Array.isArray(data) ? data : [data],
  url,
});
