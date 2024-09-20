import { UserSubscriptionService } from "@/services/UserSubscriptionService/index.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  Query: {
    mySubscription: async (parent, args, { user }) => {
      return await UserSubscriptionService.findUsersSubscription({
        authenticatedUserID: user.id,
      });
    },
  },
};
