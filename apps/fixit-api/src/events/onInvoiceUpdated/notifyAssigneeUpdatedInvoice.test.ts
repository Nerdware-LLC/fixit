import { User, type UserItem } from "@fixit/dynamodb-models/User";
import { InvoicePushNotification } from "@/events/pushNotifications/index.js";
import { lambdaClient } from "@/lib/lambdaClient/index.js";
import { notifyAssigneeUpdatedInvoice } from "./notifyAssigneeUpdatedInvoice.js";
import type { InvoiceItem } from "@fixit/dynamodb-models/Invoice";

describe("notifyAssigneeUpdatedInvoice", () => {
  test("sends a push notification to the assignee when the assignee has an expoPushToken", async () => {
    const updatedInv = { assignedToUserID: "USER#123" } as InvoiceItem;
    const assigneeUser = { id: updatedInv.assignedToUserID, expoPushToken: "token" } as UserItem;
    const getItemSpy = vi.spyOn(User, "getItem").mockResolvedValueOnce(assigneeUser);
    const invokeEventSpy = vi.spyOn(lambdaClient, "invokeEvent");

    const result = await notifyAssigneeUpdatedInvoice(updatedInv);

    expect(result).toBeUndefined();
    expect(getItemSpy).toHaveBeenCalledWith({ id: updatedInv.assignedToUserID });
    expect(invokeEventSpy).toHaveBeenCalledWith("PushNotificationService", [
      new InvoicePushNotification({
        pushEventName: "InvoiceUpdated",
        recipientUser: assigneeUser,
        invoice: updatedInv,
      }),
    ]);
  });

  test("does not query the DB for a User when updatedInvoice is undefined", async () => {
    const getItemSpy = vi.spyOn(User, "getItem");
    const invokeEventSpy = vi.spyOn(lambdaClient, "invokeEvent");

    const result = await notifyAssigneeUpdatedInvoice();

    expect(result).toBeUndefined();
    expect(getItemSpy).not.toHaveBeenCalled();
    expect(invokeEventSpy).not.toHaveBeenCalled();
  });

  test("does not invoke an event if the assigneeUser can not be found", async () => {
    const updatedInvoice = { assignedToUserID: "USER#123" } as InvoiceItem;
    const getItemSpy = vi.spyOn(User, "getItem").mockResolvedValueOnce(undefined);
    const invokeEventSpy = vi.spyOn(lambdaClient, "invokeEvent");

    const result = await notifyAssigneeUpdatedInvoice(updatedInvoice);

    expect(result).toBeUndefined();
    expect(getItemSpy).toHaveBeenCalledWith({ id: updatedInvoice.assignedToUserID });
    expect(invokeEventSpy).not.toHaveBeenCalled();
  });

  test("does not invoke an event if the assigneeUser does not have an expoPushToken", async () => {
    const updatedInvoice = { assignedToUserID: "USER#123" } as InvoiceItem;
    const assigneeUser = { id: updatedInvoice.assignedToUserID } as UserItem;
    const getItemSpy = vi.spyOn(User, "getItem").mockResolvedValueOnce(assigneeUser);
    const invokeEventSpy = vi.spyOn(lambdaClient, "invokeEvent");

    const result = await notifyAssigneeUpdatedInvoice(updatedInvoice);

    expect(result).toBeUndefined();
    expect(getItemSpy).toHaveBeenCalledWith({ id: updatedInvoice.assignedToUserID });
    expect(invokeEventSpy).not.toHaveBeenCalled();
  });
});
