import { User } from "@fixit/dynamodb-models/User";
import { InvoicePushNotification } from "@/events/pushNotifications/index.js";
import { lambdaClient } from "@/lib/lambdaClient/index.js";
import type { InvoiceItem } from "@fixit/dynamodb-models/Invoice";

/**
 * Notify assignor of paid Invoice when `InvoicePaid` event is emitted.
 * @event InvoicePaid
 * @param paidInvoice - The paid Invoice
 */
export const notifyAssignorPaidInvoice = async (paidInvoice?: InvoiceItem) => {
  if (!paidInvoice) return;

  const { createdByUserID } = paidInvoice;

  const assignorUser = await User.getItem({ id: createdByUserID });

  // If assignor does not currently have a registered pushToken, return.
  if (!assignorUser?.expoPushToken) return;

  await lambdaClient.invokeEvent("PushNotificationService", [
    new InvoicePushNotification({
      pushEventName: "InvoicePaid",
      recipientUser: assignorUser,
      invoice: paidInvoice,
    }),
  ]);
};
