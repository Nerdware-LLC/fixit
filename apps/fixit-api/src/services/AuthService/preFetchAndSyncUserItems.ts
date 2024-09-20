import { User, type UserItem } from "@fixit/dynamodb-models/User";
import { UserSCAService } from "@/services/UserSCAService/index.js";
import { UserService } from "@/services/UserService/index.js";
import { UserSubscriptionService } from "@/services/UserSubscriptionService/index.js";
import type { PreFetchedUserItems } from "@fixit/api-schemas/OpenAPI/types";
import type { UserStripeConnectAccountItem } from "@fixit/dynamodb-models/UserStripeConnectAccount";
import type { UserSubscriptionItem } from "@fixit/dynamodb-models/UserSubscription";

/**
 * ### AuthService: preFetchAndSyncUserItems
 *
 * This function is used to pre-fetch User items after authenticating a user login.
 * The following items are also updated/synced:
 *
 * - User["expoPushToken"] is updated if one is provided
 * - UserStripeConnectAccount data is updated from Stripe
 * - UserSubscription data is updated from Stripe
 *
 * @returns Up-to-date User items for the authenticated User's AuthToken payload.
 */
export const preFetchAndSyncUserItems = async ({
  authenticatedUserID,
  expoPushToken,
}: {
  authenticatedUserID: UserItem["id"];
  expoPushToken?: UserItem["expoPushToken"];
}): Promise<{
  userItems: PreFetchedUserItems;
  userStripeConnectAccount: UserStripeConnectAccountItem;
  userSubscription: UserSubscriptionItem | null;
}> => {
  // If the user has provided a new ExpoPushToken, update it in the db:
  if (expoPushToken)
    await User.updateItem({ id: authenticatedUserID }, { update: { expoPushToken } });

  // Pre-fetch User items
  const { userItems, userStripeConnectAccount, userSubscription } =
    await UserService.queryUserItems({ authenticatedUserID });

  // Get up-to-date StripeConnectAccount data from Stripe
  const upToDateStripeConnectAccount =
    await UserSCAService.refreshDataFromStripe(userStripeConnectAccount);

  // Get up-to-date Subscription data from Stripe
  const upToDateSubscription = userSubscription
    ? await UserSubscriptionService.refreshDataFromStripe(userSubscription)
    : null;

  return {
    userItems,
    userStripeConnectAccount: upToDateStripeConnectAccount,
    userSubscription: upToDateSubscription,
  };
};
