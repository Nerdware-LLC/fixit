import "@fixit/vitest-utils/custom-matchers";

/**
 * This Vitest setup file accomplishes the following:
 *   1. Implements commonly-used custom matchers (see libs/vitest-utils/customMatchers)
 *   2. Calls `vi.mock()` to setup default mock implementations for modules
 *      that meet one or more of the following criteria:
 *        - Communicates with external services (e.g. Stripe, AWS SDK)
 *        - Reliant upon the operating environment (e.g., the ENV object)
 *        - Used in many test suites
 *      These default mocks satisfy the needs of most unit+int tests, and
 *      are simply overridden where necessary.
 */

//                                            MANUAL MOCK LOCATIONS:
vi.mock("@fixit/stripe-client"); //           libs/stripe-client/src/__mocks__/stripeClient.ts

vi.mock("@/server/env.js"); //                src/server/__mocks__/env.ts
vi.mock("@/lib/stripe/stripeClient.js"); //   src/lib/stripe/__mocks__/stripeClient.ts
vi.mock("@/lib/cache/productsCache.js"); //   src/lib/cache/__mocks__/productsCache.ts
vi.mock("@/lib/cache/pricesCache.js"); //     src/lib/cache/__mocks__/pricesCache.ts
vi.mock("@/lib/cache/usersCache.js"); //      src/lib/cache/__mocks__/usersCache.ts
vi.mock("@/models/ddbTable.js"); //           src/models/__mocks__/ddbTable.ts

vi.mock("@aws-sdk/client-dynamodb"); //       __mocks__/@aws-sdk/client-dynamodb.ts
vi.mock("@aws-sdk/client-lambda"); //         __mocks__/@aws-sdk/client-lambda.ts
vi.mock("@aws-sdk/client-pinpoint"); //       __mocks__/@aws-sdk/client-pinpoint.ts
vi.mock("@aws-sdk/lib-dynamodb"); //          __mocks__/@aws-sdk/lib-dynamodb.ts
