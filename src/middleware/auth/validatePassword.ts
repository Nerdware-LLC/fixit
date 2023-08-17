import { mwAsyncCatchWrapper } from "@middleware/helpers";
import { passwordHasher, AuthError } from "@utils";

/**
 * This middleware checks if the authenticated User's login type is "LOCAL",
 * and if so, compares the provided password against the passwordHash stored
 * in the db. If it's invalid, an AuthError is thrown.
 */
export const validatePassword = mwAsyncCatchWrapper<{ body: { password: string } }>(
  async (req, res, next) => {
    if (!req?._user) return next("User not found");

    if (req._user.login.type === "LOCAL") {
      const isValidPassword = await passwordHasher.validate(
        req.body.password,
        req._user.login.passwordHash
      );

      if (isValidPassword === true) {
        /* Note: req._user does not have `subscription`/`stripeConnectAccount` fields.
        For `generateAuthToken`, these fields are obtained from `queryUserItems`.   */
        req._authenticatedUser = req._user;
      } else {
        next(new AuthError("Invalid email or password"));
      }
    }

    next();
  }
);
