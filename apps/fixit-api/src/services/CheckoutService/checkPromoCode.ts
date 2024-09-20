import { promoCodesCache } from "@fixit/stripe-client/caches/promoCodesCache.js";
import type { PromoCodeInfo } from "@fixit/api-schemas/OpenAPI/types";

/**
 * This checks the provided `promoCode`s validity and discount percentage (if valid/applicable).
 */
export const checkPromoCode = ({
  promoCode: promoCodeValueToCheck,
}: {
  promoCode: string;
}): PromoCodeInfo => {
  const maybeDiscountPercentage = promoCodesCache.get(promoCodeValueToCheck)?.discount;

  return {
    value: promoCodeValueToCheck,
    isValidPromoCode: !!maybeDiscountPercentage,
    ...(maybeDiscountPercentage && { discountPercentage: maybeDiscountPercentage }),
  };
};
