import "@fixit/vitest-utils/custom-matchers";

//                                            MANUAL MOCK LOCATIONS:
vi.mock("../ddbTable.js"); //           src/models/__mocks__/ddbTable.ts
vi.mock("@aws-sdk/client-dynamodb"); //       __mocks__/@aws-sdk/client-dynamodb.ts
vi.mock("@aws-sdk/lib-dynamodb"); //          __mocks__/@aws-sdk/lib-dynamodb.ts

// FIXME do the aws-sdk modules need to be mocked like this here?
// If so, we'll need to bring in those mocks into __mocks__
