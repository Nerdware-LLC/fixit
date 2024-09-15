import { mockStripeApiList } from "./mockStripeApiList.js";
import { mockStripeInvoice } from "./mockStripeInvoice.js";
import { mockStripePaymentIntent } from "./mockStripePaymentIntent.js";
import { mockStripePlan } from "./mockStripePlan.js";
import { mockStripePrice } from "./mockStripePrice.js";
import type Stripe from "stripe";

/**
 * Default mock Stripe Subscription object.
 *
 * @docs https://docs.stripe.com/api/subscriptions/object
 */
export const mockStripeSubscription: Stripe.Subscription = {
  object: "subscription",
  id: "sub_TestTestTest",
  created: 1577836800, //              Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  current_period_start: 1606780800, // Dec 1, 2020 (2020-12-01T00:00:00.000Z)
  current_period_end: 1609459200, //   Jan 1, 2021 (2021-01-01T00:00:00.000Z)
  customer: "cus_TestTestTest",
  status: "active",
  latest_invoice: {
    ...mockStripeInvoice,
    billing_reason: "subscription_create",
    subscription: "sub_TestTestTest",
    total: 500,
    amount_paid: 500,
    payment_intent: {
      ...mockStripePaymentIntent,
      amount: 500,
      payment_method: "pm_TestTestTest",
    },
  },
  application: null,
  application_fee_percent: null,
  automatic_tax: { enabled: false },
  billing_cycle_anchor: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  billing_thresholds: null,
  cancel_at: null,
  cancel_at_period_end: false,
  canceled_at: null,
  collection_method: "charge_automatically",
  currency: "usd",
  days_until_due: null,
  default_payment_method: "pm_TestTestTest",
  default_source: null,
  default_tax_rates: [],
  description: "Mock Subscription",
  discount: null,
  ended_at: null,
  items: mockStripeApiList({
    id: "si_TestTestTest",
    object: "subscription_item",
    billing_thresholds: null,
    created: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
    metadata: {},
    plan: { ...mockStripePlan },
    price: {
      ...mockStripePrice,
      id: "price_TestANNUAL",
      product: "prod_TestTestTest",
      active: true,
      created: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
    },
    quantity: 1,
    subscription: "sub_TestTestTest", // <-- not expandable
    tax_rates: [],
  }),
  livemode: false,
  metadata: {},
  next_pending_invoice_item_invoice: null,
  on_behalf_of: null,
  pause_collection: null,
  payment_settings: {
    payment_method_options: null,
    payment_method_types: null,
    save_default_payment_method: "off",
  },
  pending_invoice_item_interval: null,
  pending_setup_intent: null,
  pending_update: null,
  schedule: null,
  start_date: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  test_clock: null,
  transfer_data: null,
  trial_end: null,
  trial_start: null,
};
