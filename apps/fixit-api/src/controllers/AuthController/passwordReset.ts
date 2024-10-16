import { sanitizePassword, isValidPassword, sanitizeHex } from "@nerdware/ts-string-helpers";
import { z as zod } from "zod";
import { PasswordResetToken } from "@fixit/dynamodb-models/PasswordResetToken";
import { ApiController } from "@/controllers/ApiController.js";
import { AuthService } from "@/services/AuthService/index.js";

/**
 * This controller method completes the password reset process for a user.
 *
 * > Endpoint: `POST /api/auth/password-reset`
 */
export const passwordReset = ApiController<"/auth/password-reset">(
  // Req body schema:
  zod
    .object({
      password: zod.string().transform(sanitizePassword).refine(isValidPassword),
      passwordResetToken: zod
        .string()
        .transform(sanitizeHex)
        .refine(PasswordResetToken.isRawTokenProperlyEncoded),
    })
    .strict(),
  // Controller logic:
  async (req, res) => {
    const { password, passwordResetToken } = req.body;

    await AuthService.resetPassword({ password, passwordResetToken });

    res.sendStatus(200);
  }
);
