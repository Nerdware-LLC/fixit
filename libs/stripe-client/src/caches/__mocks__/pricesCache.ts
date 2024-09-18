import { Cache } from "@fixit/node-cache";
import { mockStripePrice } from "../../__mocks__/mockStripePrice.js";
import { FIXIT_SUB_PRICE_NAMES, type SubscriptionPriceName } from "../../_circularDependencyFix.js";
import type Stripe from "stripe";

/**
 * Mock Prices Cache
 */
export const pricesCache = new Cache<Stripe.Price, SubscriptionPriceName>(
  FIXIT_SUB_PRICE_NAMES.map((priceName) => [
    priceName,
    {
      ...mockStripePrice,
      id: `price_Test${priceName}`,
      nickname: priceName,
      ...(priceName === "TRIAL" && {
        recurring: {
          trial_period_days: 14,
          aggregate_usage: null,
          interval: "month",
          interval_count: 1,
          usage_type: "licensed",
        },
      }),
    },
  ])
);
