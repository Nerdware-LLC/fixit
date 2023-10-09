/**
 * This Vitest setup file accomplishes the following:
 *   1. Implements commonly-used custom matchers.
 *   2. Calls `vi.mock()` to setup default mock implementations for modules
 *      that meet one or more of the following criteria:
 *        - Communicates with external services (e.g. Stripe, AWS SDK)
 *        - Reliant upon the operating environment (e.g., the ENV object)
 *        - Used in many test suites
 *      These default mocks satisfy the needs of most unit+int tests, and
 *      are simply overridden where necessary.
 */

//                                       MANUAL MOCK LOCATION:
vi.mock("@/server/env"); //              src/server/env/__mocks__/index.ts
vi.mock("@/lib/stripe"); //              src/lib/stripe/__mocks__/index.ts
vi.mock("@/models/ddbTable"); //         src/models/__mocks__/ddbTable.ts
vi.mock("@aws-sdk/client-dynamodb"); //  __mocks__/@aws-sdk/client-dynamodb.ts
vi.mock("@aws-sdk/client-lambda"); //    __mocks__/@aws-sdk/client-lambda.ts
vi.mock("@aws-sdk/lib-dynamodb"); //     __mocks__/@aws-sdk/lib-dynamodb.ts

/**
 * This helper fn returns a `message` for the custom matchers below.
 * - `message` format: `"expected <received> to <predicate> <expected>"`
 */
export const getCustomMatcherMessage = ({
  received,
  expected,
  predicate,
  isNot,
  utils,
}: { received: unknown; expected: unknown; predicate: string } & ReturnType<
  typeof expect.getState
>) => {
  const receivedStr = utils.printReceived(received);
  const expectedStr = utils.printExpected(expected);
  return `expected ${receivedStr} to ${isNot ? "not " : ""}${predicate} ${expectedStr}`;
};

expect.extend({
  /** Test if the `received` value matches one of the values in the `expected` array. */
  toBeOneOf(received: unknown, matchers: Array<unknown>) {
    return {
      pass: matchers.findIndex((matcher) => this.equals(received, matcher)) > -1,
      message: () =>
        getCustomMatcherMessage({ received, expected: matchers, predicate: "be one of", ...this }),
      actual: received,
      expected: matchers,
    };
  },
  /**
   * Test if the `received` value passes the provided function (this is an asymmetric version
   * of the existing [`toSatisfy`](https://vitest.dev/api/expect.html#tosatisfy) matcher.
   */
  toSatisfyFn(received: unknown, matcherFn: (value: unknown) => boolean) {
    return {
      pass: matcherFn.call(this, received),
      message: () =>
        getCustomMatcherMessage({
          received,
          expected: matcherFn.name || "toSatisfy",
          predicate: "pass the function",
          ...this,
        }),
      actual: received,
    };
  },
});
