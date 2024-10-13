import { userModelHelpers } from "@fixit/dynamodb-models/User/helpers.js";
import { createValidatedStringScalar } from "./helpers/createValidatedStringScalar.js";

export const UserIDGraphQLScalar = createValidatedStringScalar({
  scalarName: "UserID",
  sanitize: userModelHelpers.id.sanitize,
  isValid: userModelHelpers.id.isValid,
});
