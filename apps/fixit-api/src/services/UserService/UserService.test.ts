import { userModelHelpers } from "@fixit/dynamodb-models/User";
import { scaModelHelpers } from "@fixit/dynamodb-models/UserStripeConnectAccount";
import { MOCK_USERS } from "@fixit/dynamodb-models/__mocks__";
import { stripe } from "@fixit/stripe-client";
import { mockStripeCustomer, mockStripeApiLastResponse } from "@fixit/stripe-client/__mocks__";
import { isValidStripeID } from "@fixit/stripe-client/helpers";
import { UserService } from "./index.js";

describe("UserService", () => {
  describe("UserService.registerNewUser()", () => {
    test("returns a valid User when called with valid arguments", async () => {
      // Arrange mock Users
      for (const key in MOCK_USERS) {
        // Get input for UserService.registerNewUser() method
        const mockUser = MOCK_USERS[key as keyof typeof MOCK_USERS];
        const input = {
          ...mockUser,
          ...(mockUser.login.type === "LOCAL"
            ? { password: "MockPassword@123" }
            : { googleID: mockUser.login.googleID }),
        };

        // Stub stripe.customers.create response in UserService.registerNewUser
        vi.spyOn(stripe.customers, "create").mockResolvedValueOnce({
          ...mockStripeApiLastResponse,
          ...mockStripeCustomer,
          id: mockUser.stripeCustomerID,
        });

        // Act on the UserService.registerNewUser() method
        const result = await UserService.registerNewUser(input);

        // Assert the result
        expect(result).toStrictEqual({
          id: expect.toSatisfyFn((value) => userModelHelpers.id.isValid(value)),
          sk: expect.toSatisfyFn((value) => userModelHelpers.sk.isValid(value)),
          handle: mockUser.handle,
          email: mockUser.email,
          phone: mockUser.phone,
          stripeCustomerID: mockUser.stripeCustomerID,
          ...(mockUser.expoPushToken && { expoPushToken: mockUser.expoPushToken }),
          profile: {
            ...mockUser.profile,
            givenName: expect.toBeOneOf([undefined, null, expect.any(String)]),
            familyName: expect.toBeOneOf([undefined, null, expect.any(String)]),
            businessName: expect.toBeOneOf([undefined, null, expect.any(String)]),
            photoUrl: expect.toBeOneOf([undefined, null, expect.any(String)]),
          },
          login: {
            ...mockUser.login,
            ...(mockUser.login.type === "LOCAL" && { passwordHash: expect.any(String) }),
          },
          stripeConnectAccount: {
            userID: expect.toSatisfyFn((value) => userModelHelpers.id.isValid(value)),
            id: expect.toSatisfyFn((value) => isValidStripeID.connectAccount(value)),
            sk: expect.toSatisfyFn((value) => scaModelHelpers.sk.isValid(value)),
            detailsSubmitted: expect.any(Boolean),
            chargesEnabled: expect.any(Boolean),
            payoutsEnabled: expect.any(Boolean),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      }
    });
  });
});
