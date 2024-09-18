import { Cache } from "@fixit/node-cache";
import type { PromoCodesCacheObject } from "../promoCodesCache.js";

/**
 * Mock PromoCodes Cache
 */
export const promoCodesCache = new Cache<PromoCodesCacheObject>([
  ["PROMOTEST10", { id: "promo_TestPROMO10", discount: 10 }],
]);
