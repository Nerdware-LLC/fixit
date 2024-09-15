import { mockStripeApiList } from "./mockStripeApiList.js";
import { mockStripeSubscription } from "./mockStripeSubscription.js";
import type Stripe from "stripe";

/**
 * Default mock Stripe Customer object.
 *
 * @docs https://docs.stripe.com/api/customers/object
 */
export const mockStripeCustomer: Stripe.Customer = {
  object: "customer",
  id: "cus_TestTestTest",
  email: "foo_email@gmail.com",
  phone: "5555555555",
  description: "Mock User",
  balance: 0,
  created: 1577836800, // 2020-01-01T00:00:00Z
  default_source: "pm_TestTestTest",
  invoice_settings: {
    default_payment_method: "pm_TestTestTest",
    custom_fields: null,
    footer: null,
    rendering_options: null,
  },
  subscriptions: mockStripeApiList({
    ...mockStripeSubscription,
    default_payment_method: "pm_TestTestTest",
  }),
  livemode: false,
  metadata: {},
  shipping: null,
};

/**
 * Default mock Stripe DeletedCustomer object.
 *
 * @docs https://docs.stripe.com/api/customers/delete
 */
export const mockStripeDeletedCustomer: Stripe.DeletedCustomer = {
  object: "customer",
  id: "cus_TestTestTest",
  deleted: true,
};
