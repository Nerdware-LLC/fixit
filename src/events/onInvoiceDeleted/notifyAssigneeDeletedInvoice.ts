import { InvoicePushNotification } from "@events/pushNotifications";
import { lambdaClient } from "@lib/lambdaClient";
import { User } from "@models";
import type { InvoiceType } from "@types";

export const notifyAssigneeDeletedInvoice = async (deletedInvoice: InvoiceType) => {
  const { assignedToUserID } = deletedInvoice;

  const assigneeUser = await User.getUserByID(assignedToUserID);

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new InvoicePushNotification({
      pushEventName: "InvoiceDeleted",
      recipientUser: {
        id: assignedToUserID,
        expoPushToken: assigneeUser.expoPushToken,
      },
      invoice: deletedInvoice,
    }),
  ]);
};
