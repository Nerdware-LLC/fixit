import { User } from "@fixit/dynamodb-models/User/index.js";
import { WorkOrderPushNotification } from "@/events/pushNotifications/index.js";
import { lambdaClient } from "@/lib/lambdaClient/index.js";
import type { WorkOrderItem } from "@fixit/dynamodb-models/WorkOrder/index.js";

/**
 * Notify assignor of completed WorkOrder when `WorkOrderCompleted` event is emitted.
 * @event WorkOrderCompleted
 * @param completedWO - The completed WorkOrder
 */
export const notifyAssignorCompletedWO = async (completedWO?: WorkOrderItem) => {
  if (!completedWO) return;

  const assignorUser = await User.getItem({ id: completedWO.createdByUserID });

  // If assignor does not currently have a registered pushToken, return.
  if (!assignorUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new WorkOrderPushNotification({
      pushEventName: "WorkOrderCompleted",
      recipientUser: assignorUser,
      workOrder: completedWO,
    }),
  ]);
};
