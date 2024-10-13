import { workOrderModelHelpers } from "@fixit/dynamodb-models/WorkOrder/helpers.js";
import { createValidatedStringScalar } from "./helpers/createValidatedStringScalar.js";

export const WorkOrderIDGraphQLScalar = createValidatedStringScalar({
  scalarName: "WorkOrderID",
  sanitize: workOrderModelHelpers.id.sanitize,
  isValid: workOrderModelHelpers.id.isValid,
});
