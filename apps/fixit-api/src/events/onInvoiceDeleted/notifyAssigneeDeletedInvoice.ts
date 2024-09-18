import { User } from "@fixit/dynamodb-models/User/index.js";
import { InvoicePushNotification } from "@/events/pushNotifications/index.js";
import { lambdaClient } from "@/lib/lambdaClient/index.js";
import type { InvoiceItem } from "@fixit/dynamodb-models/Invoice/index.js";

/**
 * Notify assignee of deleted Invoice when `InvoiceDeleted` event is emitted.
 * @event InvoiceDeleted
 * @param deletedInvoice - The deleted Invoice
 */
export const notifyAssigneeDeletedInvoice = async (deletedInvoice?: InvoiceItem) => {
  if (!deletedInvoice) return;

  const { assignedToUserID } = deletedInvoice;

  const assigneeUser = await User.getItem({ id: assignedToUserID });

  // If assignee does not currently have a registered pushToken, return.
  if (!assigneeUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new InvoicePushNotification({
      pushEventName: "InvoiceDeleted",
      recipientUser: assigneeUser,
      invoice: deletedInvoice,
    }),
  ]);
};
