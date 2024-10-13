import { contactModelHelpers } from "@fixit/dynamodb-models/Contact/helpers.js";
import { createValidatedStringScalar } from "./helpers/createValidatedStringScalar.js";

export const ContactIDGraphQLScalar = createValidatedStringScalar({
  scalarName: "ContactID",
  sanitize: contactModelHelpers.id.sanitize,
  isValid: contactModelHelpers.id.isValid,
});
