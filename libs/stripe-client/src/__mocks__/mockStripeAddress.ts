import type Stripe from "stripe";

/**
 * Default mock Stripe Address object.
 *
 * @docs https://docs.stripe.com/api/terminal/locations/object
 */
export const mockStripeAddress: Stripe.Address = {
  country: null,
  state: null,
  city: null,
  postal_code: null,
  line1: null,
  line2: null,
};
