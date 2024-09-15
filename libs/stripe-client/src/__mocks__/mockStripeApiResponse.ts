import type Stripe from "stripe";
import type { EmptyObject } from "type-fest";

/**
 * Default mock Stripe API `lastResponse` object.
 */
export const mockStripeApiLastResponse: Stripe.Response<EmptyObject> = {
  lastResponse: {
    headers: {},
    requestId: "req_TestTestTest",
    statusCode: 200,
    apiVersion: "2022-08-01",
  },
};

/**
 * Returns a mock Stripe API Response object.
 */
export const mockStripeApiResponse = <Data extends Record<string, any>>(
  data: Data
): Promise<Stripe.Response<Data>> => {
  return Promise.resolve({
    ...mockStripeApiLastResponse,
    ...data,
  });
};
