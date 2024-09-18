import { Cache } from "@fixit/node-cache";
import { mockStripeProduct } from "../../__mocks__/mockStripeProduct.js";
import { FIXIT_SUB_PRODUCT_NAME } from "../../_circularDependencyFix.js";
import type Stripe from "stripe";

/**
 * Mock Products Cache
 */
export const productsCache = new Cache<Stripe.Product, typeof FIXIT_SUB_PRODUCT_NAME>([
  [FIXIT_SUB_PRODUCT_NAME, mockStripeProduct],
]);
