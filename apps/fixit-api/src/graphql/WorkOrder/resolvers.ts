import { hasKey } from "@nerdware/ts-type-safety-utils";
import { DeleteMutationResponse } from "@fixit/api-schemas/GraphQL/responses";
import {
  createWorkOrderInputZodSchema,
  updateWorkOrderInputZodSchema,
} from "@fixit/api-schemas/GraphQL/validation";
import { User } from "@fixit/dynamodb-models/User";
import {
  workOrderModelHelpers,
  WORK_ORDER_STATUSES as WO_STATUSES,
} from "@fixit/dynamodb-models/WorkOrder";
import { WorkOrderService } from "@/services/WorkOrderService/index.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  Query: {
    workOrder: async (_parent, { workOrderID }) => {
      // Sanitize workOrderID
      workOrderID = workOrderModelHelpers.id.sanitizeAndValidate(workOrderID);

      return await WorkOrderService.findWorkOrderByID({ workOrderID });
    },
    myWorkOrders: async (_parent, _args, { user }) => {
      return await WorkOrderService.queryUsersWorkOrders({ authenticatedUser: user });
    },
  },
  Mutation: {
    createWorkOrder: async (_parent, { workOrder: createWorkOrderInput }, { user }) => {
      // Sanitize and validate the provided createWorkOrderInput
      createWorkOrderInput = createWorkOrderInputZodSchema.parse(createWorkOrderInput);

      return await WorkOrderService.createWorkOrder({
        createdByUserID: user.id,
        ...createWorkOrderInput,
      });
    },
    updateWorkOrder: async (_parent, { workOrderID, workOrder: woInput }, { user }) => {
      // Sanitize workOrderID
      workOrderID = workOrderModelHelpers.id.sanitizeAndValidate(workOrderID);
      // Sanitize and validate the provided woInput
      woInput = updateWorkOrderInputZodSchema.parse(woInput);

      return await WorkOrderService.updateWorkOrder({
        workOrderID,
        update: woInput,
        authenticatedUserID: user.id,
      });
    },
    cancelWorkOrder: async (_parent, { workOrderID }, { user }) => {
      // Sanitize workOrderID
      workOrderID = workOrderModelHelpers.id.sanitizeAndValidate(workOrderID);

      const { deleted, workOrder } = await WorkOrderService.cancelWorkOrder({
        workOrderID,
        authenticatedUserID: user.id,
      });

      return deleted
        ? new DeleteMutationResponse({ success: true, id: workOrder.id })
        : { __typename: "WorkOrder", ...workOrder };
    },
    setWorkOrderStatusComplete: async (_parent, { workOrderID }, { user }) => {
      // Sanitize workOrderID
      workOrderID = workOrderModelHelpers.id.sanitizeAndValidate(workOrderID);

      return await WorkOrderService.setWorkOrderStatusComplete({
        workOrderID,
        authenticatedUserID: user.id,
      });
    },
  },
  WorkOrder: {
    createdBy: async ({ createdByUserID }, _args, { user }) => {
      if (createdByUserID === user.id) return user;

      const createdByUser = await User.getItem({ id: createdByUserID });

      return createdByUser!;
    },
    assignedTo: async ({ assignedToUserID }, _args, { user }) => {
      if (!assignedToUserID || assignedToUserID === WO_STATUSES.UNASSIGNED) return null;
      if (assignedToUserID === user.id) return user;

      const assignedToUser = await User.getItem({ id: assignedToUserID });

      return assignedToUser!;
    },
  },
  CancelWorkOrderResponse: {
    __resolveType(parent) {
      return hasKey(parent, "createdBy") || hasKey(parent, "location")
        ? "WorkOrder"
        : parent.id && hasKey(parent, "success")
          ? "DeleteMutationResponse"
          : null; // null --> GraphQLError is thrown
    },
  },
};
