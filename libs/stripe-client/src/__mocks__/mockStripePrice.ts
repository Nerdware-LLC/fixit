import type Stripe from "stripe";

/**
 * Default mock Stripe Price object.
 *
 * @docs https://docs.stripe.com/api/prices/object
 */
export const mockStripePrice: Stripe.Price = {
  object: "price",
  id: "price_TestANNUAL",
  active: true,
  billing_scheme: "per_unit",
  created: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  currency: "usd",
  currency_options: {},
  custom_unit_amount: null,
  livemode: false,
  lookup_key: null,
  metadata: {},
  nickname: "ANNUAL",
  product: "prod_TestTestTest",
  recurring: {
    aggregate_usage: null,
    interval: "month",
    interval_count: 1,
    trial_period_days: null,
    usage_type: "licensed",
  },
  tax_behavior: "unspecified",
  tiers_mode: null,
  transform_quantity: null,
  type: "recurring",
  unit_amount: 500,
  unit_amount_decimal: "500",
};
