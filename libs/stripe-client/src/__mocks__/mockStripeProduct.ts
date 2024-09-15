import type Stripe from "stripe";

/**
 * Default mock Stripe Product object.
 *
 * @docs https://docs.stripe.com/api/products/object
 */
export const mockStripeProduct: Stripe.Product = {
  id: "prod_TestTestTest",
  object: "product",
  active: true,
  created: 1678833149, // 2023-01-01T00:00:00Z
  default_price: null,
  description: "The payment app for people who need to get things done.",
  images: [],
  livemode: false,
  metadata: {},
  name: "Fixit Subscription",
  package_dimensions: null,
  shippable: null,
  statement_descriptor: "FIXIT_SUBSCRIPTION",
  tax_code: null,
  unit_label: null,
  updated: 1678833149, // 2023-01-01T00:00:00Z
  url: null,
  attributes: [],
  type: "service",
};
