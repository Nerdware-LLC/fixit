import jwt from "jsonwebtoken";
import { JWT } from "./JWT.js";

const MOCK_JWT_PAYLOAD = { id: "123" };
const MOCK_PRIVATE_KEY = "TestTestTest";

describe("JWT", () => {
  describe("JWT.signAndEncode()", () => {
    test("returns a valid signed JWT when called with a valid payload arg", async () => {
      const token = JWT.signAndEncode(MOCK_JWT_PAYLOAD, MOCK_PRIVATE_KEY);
      const result = await JWT.validateAndDecode(token, MOCK_PRIVATE_KEY);
      expect(result).toStrictEqual(expect.objectContaining(MOCK_JWT_PAYLOAD));
    });
  });

  describe("JWT.validateAndDecode()", () => {
    test("returns a decoded payload when called with a valid token arg", async () => {
      const token = jwt.sign(MOCK_JWT_PAYLOAD, MOCK_PRIVATE_KEY, {
        audience: "http://localhost",
        issuer: "TestTestTest",
        algorithm: "HS256",
        expiresIn: "5m",
      });
      const result = await JWT.validateAndDecode(token, MOCK_PRIVATE_KEY);
      expect(result).toStrictEqual(expect.objectContaining(MOCK_JWT_PAYLOAD));
    });

    test("throws an error when called with an invalid token arg", async () => {
      await expect(JWT.validateAndDecode("invalid_token", MOCK_PRIVATE_KEY)).rejects.toThrow(
        "Signature verification failed"
      );
    });

    test(`throws "JsonWebTokenError" when called with a token with an invalid signature`, async () => {
      const token = jwt.sign(MOCK_JWT_PAYLOAD, "invalid_private_key", {
        audience: "http://localhost",
        issuer: "TestTestTest",
        algorithm: "HS256",
        expiresIn: "5m",
      });
      await expect(JWT.validateAndDecode(token, MOCK_PRIVATE_KEY)).rejects.toThrow(/signature/i);
    });

    test(`throws "TokenExpiredError" when called with a token with an expired maxAge`, async () => {
      const token = jwt.sign(MOCK_JWT_PAYLOAD, MOCK_PRIVATE_KEY, {
        audience: "http://localhost",
        issuer: "TestTestTest",
        algorithm: "HS256",
        expiresIn: "0s",
      });
      await expect(JWT.validateAndDecode(token, MOCK_PRIVATE_KEY)).rejects.toThrow(/expired/i);
    });
  });
});
