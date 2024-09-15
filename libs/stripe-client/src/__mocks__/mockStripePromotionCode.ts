import type Stripe from "stripe";

/**
 * Default mock Stripe PromotionCode object.
 *
 * @docs https://docs.stripe.com/api/promotion_codes/object
 */
export const mockStripePromotionCode: Stripe.PromotionCode = {
  id: "promo_TestPROMO10",
  object: "promotion_code",
  active: true,
  code: "PROMO10",
  coupon: {
    id: "nVJYDOag",
    object: "coupon",
    amount_off: null,
    created: 1678040164, // 2023-01-01T00:00:00Z
    currency: "usd",
    duration: "repeating",
    duration_in_months: 3,
    livemode: false,
    max_redemptions: null,
    metadata: {},
    name: null,
    percent_off: 10,
    redeem_by: null,
    times_redeemed: 0,
    valid: true,
  },
  created: 1678040164, // 2023-01-01T00:00:00Z
  customer: null,
  expires_at: null,
  livemode: false,
  max_redemptions: null,
  metadata: {},
  restrictions: {
    first_time_transaction: false,
    minimum_amount: null,
    minimum_amount_currency: null,
  },
  times_redeemed: 0,
};
