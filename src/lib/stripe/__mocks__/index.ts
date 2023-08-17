import { findMock } from "@tests/staticMockItems";
import { mockStripeBillingPortalSession } from "./_mockStripeBillingPortalSession";
import { mockStripeConnectAccount } from "./_mockStripeConnectAccount";
import { mockStripeConnectAccountLink } from "./_mockStripeConnectAccountLink";
import { mockStripeConnectLoginLink } from "./_mockStripeConnectLoginLink";
import { mockStripeCustomer, mockStripeDeletedCustomer } from "./_mockStripeCustomer";
import { mockStripePaymentIntent } from "./_mockStripePaymentIntent";
import { mockStripePaymentMethod } from "./_mockStripePaymentMethod";
import { mockStripeSubscription } from "./_mockStripeSubscription";
import type { ParamsOfFirstOverload } from "@types";
import type Stripe from "stripe";
import type { SetRequired, AsyncReturnType } from "type-fest";

// Ensure isValidStripeID util is exported from here:
export * from "@lib/stripe/isValidStripeID";

/**
 * Mock Stripe API method signatures are mostly identical to the real Stripe API,
 * but some parameter typings are slightly altered for testing purposes. This is
 * necessary for the following reasons:
 *
 * - Our mock helper-fns often require a field like `email` to find the relevant
 *   mock user, even if the real Stripe API doesn't require `email` for the method.
 *
 * - The real Stripe API's typings place function overloads with _fewer_ args after
 *   those with _more_ args. Since the `Parameters` util type only selects the _last_
 *   overload, this ordering sometimes results in the 1st arg being typed as something
 *   like `RequestOptions` (which this app never uses) instead of something like the
 *   `CustomerCreateParams` object. So instead we grab the 1st overload with util type
 *   {@link ParamsOfFirstOverload}.
 */
export const stripe: MockStripeAPI = {
  accountLinks: {
    create: async ({ account: stripeConnectAccountID }) => {
      return Promise.resolve(mockStripeConnectAccountLink(stripeConnectAccountID));
    },
  },
  accounts: {
    create: async ({ email }) => {
      const mockUser = findMock.user(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
        `[MOCK:stripe.accounts.create] No mock User found with email: ${email}`
      );
      return Promise.resolve(
        mockStripeConnectAccount({
          ...mockUser,
          ...findMock.stripeConnectAccount(
            (sca) => sca.userID === mockUser.id,
            `[MOCK:stripe.accounts.create] No mock UserStripeConnectAccount found with userID: ${mockUser.id}`
          ),
        })
      );
    },
    createLoginLink: async (stripeConnectAccountID) => {
      return Promise.resolve(mockStripeConnectLoginLink(stripeConnectAccountID));
    },
    retrieve: async (stripeConnectAccountID) => {
      return Promise.resolve(
        mockStripeConnectAccount(
          findMock.stripeConnectAccount(
            (sca) => sca.id === stripeConnectAccountID,
            `[MOCK:stripe.accounts.retrieve] No mock UserStripeConnectAccount found with id: ${stripeConnectAccountID}`
          )
        )
      );
    },
  },
  billingPortal: {
    /** Mock Stripe BillingPortal Sessions API */
    sessions: {
      create: async ({ customer: stripeCustomerID }) => {
        return Promise.resolve(mockStripeBillingPortalSession({ stripeCustomerID }));
      },
    },
  },
  customers: {
    create: async ({ email }) => {
      const mockUser = findMock.user(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
        `[MOCK:stripe.customers.create] No mock User found with email: ${email}`
      );
      return Promise.resolve(
        mockStripeCustomer({
          ...mockUser,
          subscription: findMock.subscription(
            (sub) => sub.userID === mockUser.id,
            `[MOCK:stripe.customers.create] No mock UserSubscription found with userID: ${mockUser.id}`
          ),
        })
      );
    },
    retrieve: async (stripeCustomerID) => {
      const mockUser = findMock.user(
        (user) => user.stripeCustomerID === stripeCustomerID,
        `[MOCK:stripe.customers.retrieve] No mock User found with stripeCustomerID: ${stripeCustomerID}`
      );
      return Promise.resolve(
        mockStripeCustomer({
          ...mockUser,
          subscription: findMock.subscription(
            (sub) => sub.userID === mockUser.id,
            `[MOCK:stripe.customers.retrieve] No mock UserSubscription found with userID: ${mockUser.id}`
          ),
        })
      );
    },
    update: async (stripeCustomerID, customerUpdateParams) => {
      const mockUser = findMock.user(
        (user) => user.stripeCustomerID === stripeCustomerID,
        `[MOCK:stripe.customers.update] No mock User found with stripeCustomerID: ${stripeCustomerID}`
      );
      return Promise.resolve(
        mockStripeCustomer(
          {
            ...mockUser,
            subscription: findMock.subscription(
              (sub) => sub.userID === mockUser.id,
              `[MOCK:stripe.customers.update] No mock UserSubscription found with userID: ${mockUser.id}`
            ),
          },
          customerUpdateParams
        )
      );
    },
    del: async (stripeCustomerID) => {
      return Promise.resolve(
        mockStripeDeletedCustomer(
          findMock.user(
            (user) => user.stripeCustomerID === stripeCustomerID,
            `[MOCK:stripe.customers.del] No mock User found with stripeCustomerID: ${stripeCustomerID}`
          )
        )
      );
    },
  },
  paymentIntents: {
    create: async (args) => {
      return Promise.resolve(mockStripePaymentIntent(args));
    },
  },
  paymentMethods: {
    attach: async (paymentMethodID, { customer: stripeCustomerID }) => {
      return Promise.resolve(
        mockStripePaymentMethod(
          findMock.user(
            (user) => user.stripeCustomerID === stripeCustomerID,
            `[MOCK:stripe.paymentMethods.attach] No mock user found with stripeCustomerID: ${stripeCustomerID}`
          ),
          { id: paymentMethodID }
        )
      );
    },
  },
  subscriptions: {
    create: async ({ customer: stripeCustomerID }) => {
      const mockUser = findMock.user(
        (user) => user.stripeCustomerID === stripeCustomerID,
        `[MOCK:stripe.subscriptions.create] No mock User found with stripeCustomerID: ${stripeCustomerID}`
      );
      return Promise.resolve(
        mockStripeSubscription({
          ...mockUser,
          subscription: findMock.subscription(
            (sub) => sub.userID === mockUser.id,
            `[MOCK:stripe.subscriptions.create] No mock UserSubscription found with userID: ${mockUser.id}`
          ),
        })
      );
    },
    retrieve: async (subscriptionID) => {
      const mockSub = findMock.subscription(
        (sub) => sub.id === subscriptionID,
        `[MOCK:stripe.subscriptions.retrieve] No mock UserSubscription found with id: ${subscriptionID}`
      );
      return Promise.resolve(
        mockStripeSubscription({
          ...findMock.user(
            (user) => user.id === mockSub.userID,
            `[MOCK:stripe.subscriptions.retrieve] No mock User found with id: ${mockSub.userID}`
          ),
          subscription: mockSub,
        })
      );
    },
  },
};

/** See jsdoc for {@link stripe | the mock Stripe API object }. */
export type MockStripeAPI<StripeApiObj extends Record<string, any> = Stripe> = {
  [Key in keyof StripeApiObj]?: StripeApiObj[Key] extends (...args: any[]) => any
    ? MockStripeMethod<StripeApiObj[Key]>
    : StripeApiObj[Key] extends Record<string, any>
    ? MockStripeAPI<StripeApiObj[Key]>
    : never;
};

/** See jsdoc for {@link stripe | the mock Stripe API object }. */
type MockStripeMethod<StripeMethod extends (...args: any[]) => any> = <
  Params extends ParamsOfFirstOverload<StripeMethod>
>(
  arg1: MockStripeMethodParam<Params[0]>,
  arg2: MockStripeMethodParam<Params[1]>
) => Promise<Omit<AsyncReturnType<StripeMethod>, "lastResponse">>;

/** See jsdoc for {@link stripe | the mock Stripe API object }. */
type MockStripeMethodParam<Param> = Param extends { email?: string }
  ? SetRequired<Exclude<Param, undefined>, "email">
  : Exclude<Param, undefined>;
