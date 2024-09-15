import type Stripe from "stripe";

/**
 * Default mock Stripe PaymentIntent object.
 *
 * @docs https://docs.stripe.com/api/payment_intents/object
 */
export const mockStripePaymentIntent: Stripe.PaymentIntent = {
  object: "payment_intent",
  id: "pi_TestTestTest",
  amount: 5000,
  currency: "usd",
  created: 1577836800, // 2020-01-01T00:00:00Z
  status: "succeeded",
  capture_method: "automatic",
  client_secret: "pi_TestTestTest",
  confirmation_method: "manual",
  description: "Mock PaymentIntent",
  customer: null,
  on_behalf_of: null,
  payment_method: null,
  transfer_data: null,
  // The following fields are not currently used by the app, but are included here for completeness.
  amount_capturable: 5000,
  amount_received: 5000,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  invoice: null,
  last_payment_error: null,
  livemode: false,
  metadata: {},
  next_action: null,
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: "automatic",
    },
  },
  payment_method_types: ["card"],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  transfer_group: null,
};
