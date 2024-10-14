import { Location } from "@fixit/dynamodb-models/Location";
import { WorkOrder } from "@fixit/dynamodb-models/WorkOrder";
import { eventEmitter } from "@/events/eventEmitter.js";
import type { CreateWorkOrderInput } from "@fixit/api-schemas/GraphQL/types";

/**
 * ### WorkOrderService: createWorkOrder
 */
export const createWorkOrder = async (
  woInput: { createdByUserID: string } & CreateWorkOrderInput
) => {
  const {
    createdByUserID,
    assignedToUserID = "UNASSIGNED",
    location,
    ...createWorkOrderInput
  } = woInput;

  const newWO = await WorkOrder.createItem({
    createdByUserID,
    assignedToUserID,
    status: assignedToUserID === "UNASSIGNED" ? "UNASSIGNED" : "ASSIGNED",
    location: Location.fromParams(location),
    ...createWorkOrderInput,
  });

  eventEmitter.emitWorkOrderCreated(newWO);

  return newWO;
};
