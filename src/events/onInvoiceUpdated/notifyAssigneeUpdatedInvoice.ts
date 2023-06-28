import { InvoicePushNotification } from "@events/pushNotifications";
import { lambdaClient } from "@lib/lambdaClient";
import { User } from "@models";
import type { InvoiceModelItem } from "@models/Invoice";

export const notifyAssigneeUpdatedInvoice = async (updatedInvoice: InvoiceModelItem) => {
  const {
    assignedTo: { id: assignedToUserID },
  } = updatedInvoice;

  const assigneeUser = await User.getItem({
    id: assignedToUserID,
    sk: User.getFormattedSK(assignedToUserID),
  });

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new InvoicePushNotification({
      pushEventName: "InvoiceUpdated",
      recipientUser: {
        id: assignedToUserID,
        expoPushToken: assigneeUser.expoPushToken,
      },
      invoice: updatedInvoice,
    }),
  ]);
};
