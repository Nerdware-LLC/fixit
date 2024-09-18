import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { InternalServerError } from "@fixit/http-errors";
import { Cache } from "@fixit/node-cache";
import { FIXIT_SUB_PRODUCT_NAME, type SubscriptionProductName } from "../_circularDependencyFix.js";
import { stripe } from "../stripeClient.js";
import type Stripe from "stripe";

// Initialize the productsCache with all active products:
const { data: activeProducts } = await stripe.products.list({ active: true });

const fixitSubProduct = activeProducts.find((prod) => prod.name === FIXIT_SUB_PRODUCT_NAME);

// Ensure the Fixit Subscription product was returned from Stripe:
if (!fixitSubProduct) {
  throw new InternalServerError(
    "Unable to initialize productsCache — Stripe did not return expected product. " +
      safeJsonStringify(activeProducts)
  );
}

/**
 * API local cache for Stripe `Product` objects, keyed by `product.name`.
 */
export const productsCache = new Cache<Stripe.Product, SubscriptionProductName>([
  [FIXIT_SUB_PRODUCT_NAME, fixitSubProduct],
]);
