import { User } from "@fixit/dynamodb-models/User";
import { WorkOrderPushNotification } from "@/events/pushNotifications/WorkOrderPushNotification.js";
import { lambdaClient } from "@/lib/lambdaClient/lambdaClient.js";
import type { WorkOrderItem } from "@fixit/dynamodb-models/WorkOrder";

/**
 * Notify assignee of cancelled WorkOrder when `WorkOrderCancelled` event is emitted.
 * @event WorkOrderCancelled
 * @param cancelledWO - The cancelled WorkOrder
 */
export const notifyAssigneeCancelledWO = async (cancelledWO?: WorkOrderItem) => {
  if (!cancelledWO) return;

  // If new WorkOrder was UNASSIGNED, return.
  if (!cancelledWO.assignedToUserID) return;

  const assigneeUser = await User.getItem({ id: cancelledWO.assignedToUserID });

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new WorkOrderPushNotification({
      pushEventName: "WorkOrderCancelled",
      recipientUser: assigneeUser,
      workOrder: cancelledWO,
    }),
  ]);
};
