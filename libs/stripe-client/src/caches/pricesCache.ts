import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import Stripe from "stripe";
import { InternalServerError } from "@fixit/http-errors";
import { Cache } from "@fixit/node-cache";
import { productsCache } from "./productsCache.js";
import { FIXIT_SUB_PRODUCT_NAME, type SubscriptionPriceName } from "../_circularDependencyFix.js";
import { stripe } from "../stripeClient.js";
import type { Entries } from "type-fest";

// Initialize the pricesCache with all active subscription prices:

const { data: activeSubscriptionPrices } = await stripe.prices.list({
  active: true,
  product: productsCache.get(FIXIT_SUB_PRODUCT_NAME)!.id,
});

// Ensure exactly 2 active subscription prices were returned from Stripe:
if (
  activeSubscriptionPrices.length !== 2 ||
  !activeSubscriptionPrices.every((price) => ["ANNUAL", "MONTHLY"].includes(price.nickname ?? ""))
) {
  throw new InternalServerError(
    "Unable to initialize pricesCache — Stripe did not return expected prices. " +
      safeJsonStringify(activeSubscriptionPrices)
  );
}

const pricesDictionary = activeSubscriptionPrices.reduce(
  (accum: Record<SubscriptionPriceName, Stripe.Price>, priceObject) => {
    const { nickname: priceName } = priceObject;
    accum[(priceName ?? "") as SubscriptionPriceName] = priceObject;
    // TRIAL uses the same priceID as MONTHLY:
    if (priceName === "MONTHLY") accum.TRIAL = priceObject;
    return accum;
  },
  {
    ANNUAL: {} as Stripe.Price,
    MONTHLY: {} as Stripe.Price,
    TRIAL: {} as Stripe.Price,
  }
);

/**
 * API local cache for Stripe `Price` objects, keyed by `price.nickname`.
 */
export const pricesCache = new Cache<Stripe.Price, SubscriptionPriceName>(
  Object.entries(pricesDictionary) as Entries<typeof pricesDictionary>
);
