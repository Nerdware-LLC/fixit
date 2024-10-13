import { invoiceModelHelpers } from "@fixit/dynamodb-models/Invoice/helpers.js";
import { createValidatedStringScalar } from "./helpers/createValidatedStringScalar.js";

export const InvoiceIDGraphQLScalar = createValidatedStringScalar({
  scalarName: "InvoiceID",
  sanitize: invoiceModelHelpers.id.sanitize,
  isValid: invoiceModelHelpers.id.isValid,
});
