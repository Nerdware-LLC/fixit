import type Stripe from "stripe";
import type { SetRequired } from "type-fest";

/**
 * Returns a mock Stripe Event object.
 *
 * @docs https://docs.stripe.com/api/events/object
 *
 * --------------------------------------------------------
 * ### Mocking Webhook Events
 *
 * ```ts
 * // Example usage:
 * vi.spyOn(stripe.webhooks, "constructEvent").mockImplementation(
 *   () => mockStripeEvent({
 *     type: "customer.updated",
 *     data: {
 *       object: {
 *         type: "customer.updated",
 *         id: "cus_123abcTestTest",
 *         // ... other payload values
 *       },
 *     },
 *   })
 * );
 * ```
 */
export const mockStripeEvent = ({
  id: webhookEventID = "evt_TestTestTest",
  /** The webhook event type (e.g., "customer.updated") */
  type,
  /** `data.object` is the webhook event payload */
  data,
  account: connectAccountID,
  ...customValues
}: SetRequired<Partial<Stripe.Event>, "type" | "data">): Stripe.Event => ({
  object: "event",
  id: webhookEventID,
  created: 1577836800, // 2020-01-01T00:00:00Z
  type,
  ...(connectAccountID && {
    account: connectAccountID,
  }),
  data,
  api_version: "2022-08-01",
  livemode: false,
  pending_webhooks: 0,
  request: {
    id: "req_TestTestTest",
    idempotency_key: null,
  },
  ...customValues,
});
