import { WorkOrder } from "@fixit/dynamodb-models/WorkOrder";
import { UserInputError } from "@fixit/http-errors";

/**
 * ### WorkOrderService: findWorkOrderByID
 */
export const findWorkOrderByID = async ({ workOrderID }: { workOrderID: string }) => {
  const [workOrder] = await WorkOrder.query({
    where: { id: workOrderID },
    limit: 1,
  });

  if (!workOrder)
    throw new UserInputError("A wwork order with the provided ID could not be found.");

  return workOrder;
};
