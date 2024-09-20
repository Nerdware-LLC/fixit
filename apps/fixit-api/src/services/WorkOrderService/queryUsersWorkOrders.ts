import { WorkOrder } from "@fixit/dynamodb-models/WorkOrder";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";

/**
 * ### WorkOrderService: queryUsersWorkOrders
 */
export const queryUsersWorkOrders = async ({
  authenticatedUser,
}: {
  authenticatedUser: AuthTokenPayload;
}) => {
  return {
    // Query for all WorkOrders created by the authenticated User
    createdByUser: await WorkOrder.query({
      where: {
        createdByUserID: authenticatedUser.id,
        id: { beginsWith: WorkOrder.SK_PREFIX },
      },
    }),
    // Query for all WorkOrders assigned to the authenticated User
    assignedToUser: await WorkOrder.query({
      where: {
        assignedToUserID: authenticatedUser.id,
        id: { beginsWith: WorkOrder.SK_PREFIX },
      },
    }),
  };
};
