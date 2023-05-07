import { WorkOrderPushNotification } from "@events/pushNotifications";
import { lambdaClient } from "@lib/lambdaClient";
import { User } from "@models";
import type { WorkOrderType } from "@types";

export const notifyAssigneeNewWO = async (newWO: WorkOrderType) => {
  const { assignedToUserID } = newWO;

  // If new WorkOrder is UNASSIGNED, return.
  if (!assignedToUserID) return;

  const assigneeUser = await User.getUserByID(assignedToUserID);

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new WorkOrderPushNotification({
      pushEventName: "WorkOrderAssigned",
      recipientUser: {
        id: assignedToUserID,
        expoPushToken: assigneeUser.expoPushToken,
      },
      workOrder: newWO,
    }),
  ]);
};
