import type Stripe from "stripe";

/**
 * Default mock Stripe Connect Account object.
 *
 * @docs https://docs.stripe.com/api/accounts/object
 */
export const mockStripeConnectAccount: Stripe.Account = {
  object: "account",
  type: "express",
  id: "acct_TestTestTest",
  charges_enabled: true,
  details_submitted: true,
  payouts_enabled: true,
  email: "foo_email@gmail.com",
  created: 1577836800, // 2020-01-01T00:00:00Z
  country: "US",
  default_currency: "usd",
  capabilities: { card_payments: "active", transfers: "active" },
  // The fields below are not currently used by the app, but are included here for completeness.
  business_profile: {
    mcc: null,
    name: null,
    product_description: null,
    support_address: null,
    support_email: "foo_email@gmail.com",
    support_phone: "5555555555",
    support_url: null,
    url: null,
  },
  external_accounts: {
    object: "list",
    data: [],
    has_more: false,
    url: "/v1/accounts/acct_TestTestTest/external_accounts",
  },
  future_requirements: {
    alternatives: [],
    current_deadline: null,
    currently_due: [],
    disabled_reason: null,
    errors: [],
    eventually_due: [],
    past_due: [],
    pending_verification: [],
  },
  metadata: {},
  requirements: {
    alternatives: [],
    current_deadline: null,
    currently_due: [],
    disabled_reason: null,
    errors: [],
    eventually_due: [],
    past_due: [],
    pending_verification: [],
  },
  settings: {
    bacs_debit_payments: {},
    branding: {
      icon: null,
      logo: null,
      primary_color: null,
      secondary_color: null,
    },
    card_issuing: { tos_acceptance: { date: null, ip: null } },
    card_payments: {
      decline_on: { avs_failure: true, cvc_failure: false },
      statement_descriptor_prefix: null,
      statement_descriptor_prefix_kanji: null,
      statement_descriptor_prefix_kana: null,
    },
    dashboard: { display_name: "Foo DisplayName", timezone: "US/Pacific" },
    payments: {
      statement_descriptor: null,
      statement_descriptor_kana: null,
      statement_descriptor_kanji: null,
      statement_descriptor_prefix_kana: null,
      statement_descriptor_prefix_kanji: null,
    },
    payouts: {
      debit_negative_balances: true,
      schedule: { delay_days: 7, interval: "daily" },
      statement_descriptor: null,
    },
    sepa_debit_payments: {},
  },
  tos_acceptance: {
    date: null,
    ip: null,
    user_agent: null,
  },
};
