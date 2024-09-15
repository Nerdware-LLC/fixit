import { mockStripeApiListPromise } from "./mockStripeApiListPromise.js";
import { mockStripeApiResponse } from "./mockStripeApiResponse.js";
import { mockStripeBillingPortalSession } from "./mockStripeBillingPortalSession.js";
import { mockStripeConnectAccount } from "./mockStripeConnectAccount.js";
import { mockStripeConnectAccountLink } from "./mockStripeConnectAccountLink.js";
import { mockStripeConnectLoginLink } from "./mockStripeConnectLoginLink.js";
import { mockStripeCustomer, mockStripeDeletedCustomer } from "./mockStripeCustomer.js";
import { mockStripePaymentIntent } from "./mockStripePaymentIntent.js";
import { mockStripePaymentMethod } from "./mockStripePaymentMethod.js";
import { mockStripePrice } from "./mockStripePrice.js";
import { mockStripeProduct } from "./mockStripeProduct.js";
import { mockStripePromotionCode } from "./mockStripePromotionCode.js";
import { mockStripeSubscription } from "./mockStripeSubscription.js";
import type Stripe from "stripe";
import type { PartialDeep, OverrideProperties } from "type-fest";

/**
 * ## Mock Stripe API
 *
 * A mock Stripe API object that can be used to simulate Stripe API responses. This object contains
 * sensible defaults for every Stripe API method used by Fixit services, but responses should be
 * stubbed wherever it's necessary to test specific scenarios (e.g., if a test's assertions depend
 * on a specific response from the Stripe API).
 *
 * ---
 * ### **Example:** Stubbing a response for `stripe.paymentMethods.attach`:
 *
 * ```ts
 * import { stripe } from "@fixit/stripe-client";
 * // Ensure the mock Stripe API is used via hoisted vi.mock call:
 * vi.mock("@fixit/stripe-client");
 * //
 * test("foo test description", () => {
 *   // Stub the response for `stripe.paymentMethods.attach`:
 *   vi.spyOn(stripe.paymentMethods, "attach").mockResolvedValueOnce(
 *     {
 *       id: "pm_TestTestTest",
 *       // ... other mocked PaymentMethod fields ...
 *     }
 *   );
 *   // ... test code ...
 * });
 * ```
 */
export const stripe = {
  accountLinks: {
    create: async () => mockStripeApiResponse(mockStripeConnectAccountLink),
  },
  accounts: {
    create: async () => mockStripeApiResponse(mockStripeConnectAccount),
    createLoginLink: async () => mockStripeApiResponse(mockStripeConnectLoginLink),
    retrieve: async () => mockStripeApiResponse(mockStripeConnectAccount),
  },
  billingPortal: {
    sessions: {
      create: async () => mockStripeApiResponse(mockStripeBillingPortalSession),
    },
  },
  customers: {
    create: async (params) => {
      const { email = null } = params as Stripe.CustomerCreateParams;
      return mockStripeApiResponse({ ...mockStripeCustomer, email });
    },
    retrieve: async (stripeCustomerID) => {
      return mockStripeApiResponse({ ...mockStripeCustomer, id: stripeCustomerID });
    },
    update: async (stripeCustomerID, customerUpdateParams) => {
      return mockStripeApiResponse({
        ...mockStripeCustomer,
        id: stripeCustomerID,
        ...(!!customerUpdateParams?.invoice_settings?.default_payment_method && {
          invoice_settings: {
            ...mockStripeCustomer.invoice_settings,
            default_payment_method: customerUpdateParams.invoice_settings.default_payment_method,
          },
        }),
      });
    },
    del: async (stripeCustomerID) => {
      return mockStripeApiResponse({ ...mockStripeDeletedCustomer, id: stripeCustomerID });
    },
  },
  paymentIntents: {
    confirm: async (paymentIntentID, paymentIntentConfirmParams = {}) => {
      const { payment_method: paymentMethodID } =
        paymentIntentConfirmParams as Stripe.PaymentIntentConfirmParams;

      return mockStripeApiResponse({
        ...mockStripePaymentIntent,
        id: paymentIntentID,
        amount: 5000,
        confirmation_method: "manual",
        payment_method: paymentMethodID || "pm_TestTestTest",
        status: "succeeded",
        invoice: { paid: true } as Stripe.Invoice,
      });
    },
    create: async () => mockStripeApiResponse(mockStripePaymentIntent),
  },
  paymentMethods: {
    attach: async (paymentMethodID, { customer: stripeCustomerID }) => {
      return mockStripeApiResponse({
        ...mockStripePaymentMethod,
        id: paymentMethodID,
        customer: stripeCustomerID,
      });
    },
  },
  prices: {
    list: async () => mockStripeApiListPromise(mockStripePrice),
  },
  products: {
    list: async () => mockStripeApiListPromise(mockStripeProduct),
  },
  promotionCodes: {
    list: async () => mockStripeApiListPromise(mockStripePromotionCode),
  },
  subscriptions: {
    create: async ({ customer: stripeCustomerID }) => {
      return mockStripeApiResponse({ ...mockStripeSubscription, customer: stripeCustomerID });
    },
    retrieve: async (subscriptionID) => {
      return mockStripeApiResponse({ ...mockStripeSubscription, id: subscriptionID });
    },
  },
} as const satisfies PartialDeep<MockStripeAPI>;

/**
 * Mock Stripe API object type.
 *
 * For some reason, TS is not correctly detecting the presence of several {@link ApiListPromise}
 * methods on the object returned by the {@link mockStripeApiListPromise} function. TS _**does**_
 * recognize that function's return type is a valid {@link ApiListPromise} in the function's
 * definition, but it doesn't recognize the validity of the fn's return type when it's invoked,
 * even if you explicitly type-cast the return type `as ApiListPromise<T>`.
 *
 * The relevant error is below. Note that concrete item-types used by `list()` method return-types
 * like `Product`/`Price`/`PromotionCode` have been replaced by 'X'.
 *
 * ```console
 * Type 'Promise<Response<ApiList<X>>>' is missing the following properties from type 'ApiListPromise<X>':
 *   autoPagingEach, autoPagingToArray, [Symbol.asyncIterator], next.
 * ts(2322)
 * ```
 *
 * This type is a workaround to address the issue. It simply overrides the return type of every
 * implemented `list` method on the {@link Stripe} object to be `Promise<Response<ApiList<T>>>`
 * instead of an {@link ApiListPromise}.
 */
type MockStripeAPI = OverrideProperties<
  Stripe,
  {
    prices: OverrideProperties<
      Stripe.PricesResource,
      { list: () => Promise<Stripe.Response<Stripe.ApiList<Stripe.Price>>> }
    >;
    products: OverrideProperties<
      Stripe.ProductsResource,
      { list: () => Promise<Stripe.Response<Stripe.ApiList<Stripe.Product>>> }
    >;
    promotionCodes: OverrideProperties<
      Stripe.PromotionCodesResource,
      { list: () => Promise<Stripe.Response<Stripe.ApiList<Stripe.PromotionCode>>> }
    >;
  }
>;
