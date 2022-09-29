import { ddbSingleTable, Model } from "@lib/dynamoDB";
import { COMMON_MODEL_ATTRIBUTES } from "@models/_common";
import { USER_ID_REGEX } from "@models/User";
import { ENV } from "@server/env";
import { USER_SUBSCRIPTION_SK_REGEX } from "./regex";
import { SUBSCRIPTION_STATUSES } from "./validateExisting";
import { normalizeStripeFields } from "./normalizeStripeFields";
import { validateExisting } from "./validateExisting";
import type { ModelSchemaType, ModelSchemaOptions } from "@lib/dynamoDB";

const {
  FIXIT_SUBSCRIPTION: { productID, priceIDs, promoCodes }
} = ENV.STRIPE.BILLING;

/**
 * UserSubscription Model Methods:
 * @method `normalizeStripeFields()`
 * @method `validateExisting()`
 * @method `queryUserSubscriptions()`
 */
class UserSubscriptionModel extends Model<typeof UserSubscriptionModel.schema> {
  static readonly schema: ModelSchemaType = {
    pk: {
      type: "string",
      alias: "userID",
      validate: (value: string) => USER_ID_REGEX.test(value)
    },
    sk: {
      type: "string",
      validate: (value: string) => USER_SUBSCRIPTION_SK_REGEX.test(value)
    },
    data: {
      type: "string",
      alias: "id",
      validate: (value: string) => /^sub_[a-zA-Z0-9]{14}$/.test(value) // Example from Stripe docs: "sub_IiUAdsiPC26N4e"
    },
    currentPeriodEnd: {
      ...COMMON_MODEL_ATTRIBUTES.DATETIME, // TODO Make sure client gets a NUMBER, unix time in milliseconds (not a Date object)
      required: true
    },
    productID: {
      type: "string",
      required: true,
      validate: (value: string) => Object.values(UserSubscriptionModel.PRODUCT_IDS).includes(value)
      /* Fixit currently only uses 1 productID for its subscription, but more products
    and tiers will be added in the future, so `validate` emulates "enum".         */
    },
    priceID: {
      type: "string",
      required: true,
      validate: (value: string) => Object.values(UserSubscriptionModel.PRICE_IDS).includes(value)
    },
    status: {
      type: "string",
      required: true,
      validate: (value: string) => Object.keys(SUBSCRIPTION_STATUSES).includes(value)
    }
  };

  static readonly schemaOptions: ModelSchemaOptions = {
    transformItem: {
      toDB: (userSubItem: { userID: string; createdAt: Date }) => ({
        ...userSubItem,
        // prettier-ignore
        sk: `SUBSCRIPTION#${userSubItem.userID}#${Math.floor(new Date(userSubItem.createdAt).getTime() / 1000)}`
      })
    }
  };

  static readonly PRODUCT_IDS = { FIXIT_SUBSCRIPTION: productID };
  static readonly PRICE_IDS = priceIDs;
  static readonly PROMO_CODES = promoCodes;

  constructor() {
    // prettier-ignore
    super(ddbSingleTable, "UserSubscription", UserSubscriptionModel.schema, UserSubscriptionModel.schemaOptions);
  }

  // USER SUBSCRIPTION MODEL — Instance property getters
  // The below getters allow static enums to be read from the model instance (for convenience)

  get PRODUCT_IDS() {
    return UserSubscriptionModel.PRODUCT_IDS;
  }
  get PRICE_IDS() {
    return UserSubscriptionModel.PRICE_IDS;
  }
  get PROMO_CODES() {
    return UserSubscriptionModel.PROMO_CODES;
  }

  // USER SUBSCRIPTION MODEL — Instance methods:

  readonly normalizeStripeFields = normalizeStripeFields; // <-- utility for normalizing sub objects returned from Stripe API

  readonly validateExisting = validateExisting;

  readonly queryUserSubscriptions = async (userID: string) => {
    return await this.query({
      KeyConditionExpression: "pk = :userID AND begins_with(sk, :subSKprefix)",
      ExpressionAttributeValues: { ":userID": userID, ":subSKprefix": "SUBSCRIPTION#" }
    });
  };
}

export const UserSubscription = new UserSubscriptionModel();
