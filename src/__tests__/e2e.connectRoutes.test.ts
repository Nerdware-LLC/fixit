import request from "supertest";
import { stripe } from "@lib/stripe";
import { ENV } from "@server/env";
import { MOCK_USERS, MOCK_USER_SUBS, MOCK_USER_SCAs } from "@tests/staticMockItems";
import { AuthToken } from "@utils";
import { expressApp } from "../expressApp";
import type { Server } from "http";

vi.mock("@/apolloServer");

describe("[e2e][Server Requests] Routes /api/connect/*", () => {
  let server: Server;

  beforeAll(() => {
    server = expressApp.listen(ENV.CONFIG.PORT);
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /api/connect/account-link", () => {
    test("returns a valid Stripe AccountLink URL in response body", async () => {
      // Create mock AuthToken for Auth header
      const mockAuthToken = new AuthToken({
        ...MOCK_USERS.USER_A,
        stripeConnectAccount: MOCK_USER_SCAs.SCA_A,
        subscription: MOCK_USER_SUBS.SUB_A,
      });

      const mockStripeLink = "https://connect.stripe.com/express/redirect/TesTestTest";

      // Stub stripe.accountLinks.create response
      vi.spyOn(stripe.accountLinks, "create").mockResolvedValueOnce({ url: mockStripeLink } as any);

      // Send the request
      const { status, body: responseBody } = await request(expressApp)
        .post("/api/connect/account-link")
        .set("Authorization", `Bearer ${mockAuthToken.toString()}`)
        .send({ returnURL: "https://mock-return-url.com" });

      // Assert the response
      expect(status).toBe(200);
      expect(responseBody).toEqual({ stripeLink: mockStripeLink });
    });
  });

  describe("GET /api/connect/dashboard-link", () => {
    test("returns a valid Stripe LoginLink object in response body", async () => {
      // Create mock AuthToken for Auth header
      const mockAuthToken = new AuthToken({
        ...MOCK_USERS.USER_A,
        stripeConnectAccount: MOCK_USER_SCAs.SCA_A,
        subscription: MOCK_USER_SUBS.SUB_A,
      });

      const mockStripeLink = "https://connect.stripe.com/express/redirect/TestTestTest";

      // Stub stripe.accounts.createLoginLink response
      vi.spyOn(stripe.accounts, "createLoginLink").mockResolvedValueOnce({
        url: mockStripeLink,
      } as any);

      // Send the request
      const { status, body: responseBody } = await request(expressApp)
        .get("/api/connect/dashboard-link")
        .set("Authorization", `Bearer ${mockAuthToken.toString()}`);

      // Assert the response
      expect(status).toBe(200);
      expect(responseBody).toEqual({ stripeLink: mockStripeLink });
    });
  });
});
