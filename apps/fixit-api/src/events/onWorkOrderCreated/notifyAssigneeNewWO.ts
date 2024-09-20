import { User } from "@fixit/dynamodb-models/User";
import { WorkOrderPushNotification } from "@/events/pushNotifications/index.js";
import { lambdaClient } from "@/lib/lambdaClient/index.js";
import type { WorkOrderItem } from "@fixit/dynamodb-models/WorkOrder";

/**
 * Notify assignee of new WorkOrder when `WorkOrderAssigned` event is emitted.
 * @event WorkOrderAssigned
 * @param newWO - The new WorkOrder
 */
export const notifyAssigneeNewWO = async (newWO?: WorkOrderItem) => {
  if (!newWO) return;

  // If new WorkOrder is UNASSIGNED, return.
  if (!newWO.assignedToUserID) return;

  const assigneeUser = await User.getItem({ id: newWO.assignedToUserID });

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new WorkOrderPushNotification({
      pushEventName: "WorkOrderAssigned",
      recipientUser: assigneeUser,
      workOrder: newWO,
    }),
  ]);
};
