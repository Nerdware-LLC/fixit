import { mockStripeApiList } from "./mockStripeApiList.js";
import { mockStripeApiLastResponse } from "./mockStripeApiResponse.js";
import type Stripe from "stripe";

/**
 * Returns a mock Stripe ApiListPromise object.
 */
export const mockStripeApiListPromise = <Data extends Record<string, any>>(
  data: Data | Array<Data>
): Stripe.ApiListPromise<Data> => {
  const apiList = mockStripeApiList(data);

  return Object.assign(
    Promise.resolve({
      ...mockStripeApiLastResponse,
      ...apiList,
    }),
    {
      autoPagingEach: async () => Promise.resolve(),
      autoPagingToArray: async () => Promise.resolve(apiList.data),
      [Symbol.asyncIterator]: async function* () {
        yield* await Promise.resolve(apiList.data);
      },
      next: async () => Promise.resolve({ done: true as const, value: undefined }),
    }
  );
};
