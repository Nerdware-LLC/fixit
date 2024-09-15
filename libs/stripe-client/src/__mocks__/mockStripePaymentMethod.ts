import type Stripe from "stripe";

/**
 * Default mock Stripe PaymentMethod object.
 *
 * @docs https://docs.stripe.com/api/payment_methods/object
 */
export const mockStripePaymentMethod: Stripe.PaymentMethod = {
  object: "payment_method",
  id: "pm_TestTestTest",
  type: "card",
  created: 1577836800, // 2020-01-01T00:00:00Z
  customer: "cus_TestTestTest",
  billing_details: {
    address: {
      city: null,
      country: null,
      line1: null,
      line2: null,
      postal_code: null,
      state: null,
    },
    name: "Foo DisplayName",
    email: "foo_email@gmail.com",
    phone: "1234567890",
  },
  card: {
    brand: "visa",
    checks: {
      address_line1_check: null,
      address_postal_code_check: null,
      cvc_check: "pass",
    },
    country: "US",
    exp_month: 8,
    exp_year: 2024,
    fingerprint: "Xt5EWLLDS7FJjR1c",
    funding: "credit",
    last4: "4242",
    networks: { available: ["visa"], preferred: null },
    three_d_secure_usage: { supported: true },
    wallet: null,
  },
  livemode: false,
  metadata: {},
};
