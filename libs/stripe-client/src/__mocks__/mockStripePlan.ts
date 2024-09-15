import type Stripe from "stripe";

/**
 * Default mock Stripe Plan object.
 *
 * @docs https://docs.stripe.com/api/plans/object
 */
export const mockStripePlan: Stripe.Plan = {
  object: "plan",
  id: "price_TestANNUAL",
  active: true,
  aggregate_usage: null,
  amount: 500,
  amount_decimal: "500",
  billing_scheme: "per_unit",
  created: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  currency: "usd",
  interval: "month",
  interval_count: 1,
  livemode: false,
  metadata: {},
  nickname: null,
  product: "prod_TestTestTest",
  tiers_mode: null,
  transform_usage: null,
  trial_period_days: null,
  usage_type: "licensed",
};
