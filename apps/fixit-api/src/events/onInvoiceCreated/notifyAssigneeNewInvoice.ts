import { User } from "@fixit/dynamodb-models/User";
import { InvoicePushNotification } from "@/events/pushNotifications/InvoicePushNotification.js";
import { lambdaClient } from "@/lib/lambdaClient/lambdaClient.js";
import type { InvoiceItem } from "@fixit/dynamodb-models/Invoice";

/**
 * Notify assignee of new Invoice when `NewInvoice` event is emitted.
 * @event NewInvoice
 * @param newInvoice - The new Invoice
 */
export const notifyAssigneeNewInvoice = async (newInvoice?: InvoiceItem) => {
  if (!newInvoice) return;

  const { assignedToUserID } = newInvoice;

  const assigneeUser = await User.getItem({ id: assignedToUserID });

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new InvoicePushNotification({
      pushEventName: "NewInvoice",
      recipientUser: assigneeUser,
      invoice: newInvoice,
    }),
  ]);
};
