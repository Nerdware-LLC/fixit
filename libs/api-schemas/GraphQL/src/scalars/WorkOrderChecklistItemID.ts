import { workOrderModelHelpers } from "@fixit/dynamodb-models/WorkOrder/helpers.js";
import { createValidatedStringScalar } from "./helpers/createValidatedStringScalar.js";

export const WorkOrderChecklistItemIDGraphQLScalar = createValidatedStringScalar({
  scalarName: "WorkOrderChecklistItemID",
  sanitize: workOrderModelHelpers.id.sanitize, // <-- intentional, sanitization regex is the same
  isValid: workOrderModelHelpers.checklistItemID.isValid,
});
