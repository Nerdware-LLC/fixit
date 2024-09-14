/// <reference types="./types/custom-matchers.d.ts" />

import dayjs from "dayjs";

/**
 * This helper fn returns a `message` for the custom matchers below.
 * - `message` format: `"expected <received> to <predicate> <expected>"`
 */
const getCustomMatcherMessage = ({
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
  /**
   * Test if the `received` value matches one of the values in the `expected` array.
   */
  toBeOneOf(received: unknown, matchers: Array<unknown>) {
    return {
      pass: matchers.findIndex((matcher) => this.equals(received, matcher)) > -1,
      actual: received,
      expected: matchers,
      message: () =>
        getCustomMatcherMessage({ received, expected: matchers, predicate: "be one of", ...this }),
    };
  },
  /**
   * Test if the `received` value is a valid date via `dayjs(value).isValid()`.
   */
  toBeValidDate(received: unknown) {
    return {
      pass: dayjs(received as dayjs.ConfigType).isValid(),
      actual: received,
      message: () =>
        getCustomMatcherMessage({
          received,
          expected: "valid date",
          predicate: "be a valid date",
          ...this,
        }),
    };
  },
  /**
   * Test if the `received` value passes the provided function (this is an asymmetric version
   * of the existing [`toSatisfy`](https://vitest.dev/api/expect.html#tosatisfy) matcher.
   */
  toSatisfyFn(received: unknown, matcherFn: (value: unknown) => boolean) {
    return {
      pass: matcherFn.call(this, received),
      actual: received,
      message: () =>
        getCustomMatcherMessage({
          received,
          expected: matcherFn.name || "toSatisfy",
          predicate: "pass the function",
          ...this,
        }),
    };
  },
});
