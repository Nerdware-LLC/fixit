import { mockStripeApiList } from "./mockStripeApiList.js";
import type Stripe from "stripe";

/**
 * Default mock Stripe Invoice object.
 *
 * @docs https://docs.stripe.com/api/invoices/object
 */
export const mockStripeInvoice: Stripe.Invoice = {
  object: "invoice",
  id: "in_TestTestTest",
  account_country: "US",
  account_name: "Mock User",
  account_tax_ids: null,
  amount_due: 500,
  amount_paid: 0,
  amount_remaining: 500,
  application: null,
  application_fee_amount: null,
  attempt_count: 0,
  attempted: false,
  auto_advance: false,
  automatic_tax: { enabled: false, status: null },
  billing_reason: "subscription_create",
  charge: null,
  collection_method: "charge_automatically",
  created: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  currency: "usd",
  custom_fields: null,
  customer: "cus_TestTestTest",
  customer_address: null,
  customer_email: "foo_email@gmail.com",
  customer_name: "Mock User",
  customer_phone: "5555555555",
  customer_shipping: null,
  customer_tax_exempt: "none",
  customer_tax_ids: [],
  default_payment_method: null,
  default_source: null,
  default_tax_rates: [],
  description: null,
  discount: null,
  discounts: [],
  due_date: null,
  ending_balance: null,
  footer: null,
  from_invoice: null,
  hosted_invoice_url: null,
  invoice_pdf: null,
  last_finalization_error: null,
  latest_revision: null,
  lines: mockStripeApiList({
    object: "line_item",
    id: "il_TestTestTest",
    amount: 500,
    amount_excluding_tax: 500,
    currency: "usd",
    description: "Mock Invoice Line Item",
    discount_amounts: [],
    discountable: true,
    discounts: [],
    invoice_item: "ii_TestTestTest",
    livemode: false,
    metadata: {},
    period: {
      start: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
      end: 1580515200, //   Feb 1, 2020 (2020-02-01T00:00:00.000Z)
    },
    price: null,
    plan: null,
    proration: false,
    proration_details: { credited_items: null },
    quantity: 1,
    subscription: "sub_TestTestTest",
    tax_amounts: [],
    tax_rates: [],
    type: "invoiceitem",
    unit_amount_excluding_tax: "500",
  }),
  livemode: false,
  metadata: {},
  next_payment_attempt: null,
  number: null,
  on_behalf_of: null,
  paid: false,
  paid_out_of_band: false,
  payment_intent: null,
  payment_settings: {
    default_mandate: null,
    payment_method_options: null,
    payment_method_types: null,
  },
  period_start: 1577836800, // Jan 1, 2020 (2020-01-01T00:00:00.000Z)
  period_end: 1580515200, //   Feb 1, 2020 (2020-02-01T00:00:00.000Z)
  post_payment_credit_notes_amount: 0,
  pre_payment_credit_notes_amount: 0,
  quote: null,
  receipt_number: null,
  rendering_options: null,
  starting_balance: 0,
  statement_descriptor: null,
  status: "open",
  status_transitions: {
    finalized_at: null,
    marked_uncollectible_at: null,
    paid_at: null,
    voided_at: null,
  },
  subscription: "sub_TestTestTest",
  subtotal: 500,
  subtotal_excluding_tax: 500,
  tax: null,
  test_clock: null,
  total: 500,
  total_discount_amounts: [],
  total_excluding_tax: 500,
  total_tax_amounts: [],
  transfer_data: null,
  webhooks_delivered_at: null,
};
