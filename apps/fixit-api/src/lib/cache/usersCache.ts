import { USER_ID_PREFIX_STR } from "@fixit/dynamodb-models/User";
import { ddbTable } from "@fixit/dynamodb-models/ddbTable";
import { Cache } from "@fixit/node-cache";
import type { User, Contact } from "@fixit/api-schemas/GraphQL/types";
import type { UnaliasedUserItem } from "@fixit/dynamodb-models/User";
import type { Simplify } from "type-fest";

export type UsersCacheObject = Simplify<Pick<User, keyof Contact>>;
export type UsersCacheEntry = [User["handle"], UsersCacheObject];

const initialCacheEntries: Array<UsersCacheEntry> = [];

// Initialize the usersCache with all active users:
const { Items: items = [] } = await ddbTable.ddbClient.scan({
  TableName: ddbTable.tableName,
  ProjectionExpression: "pk, sk, #data, handle, phone, profile",
  FilterExpression: "begins_with(pk, :user_pk_prefix)",
  ExpressionAttributeNames: {
    "#data": "data",
  },
  ExpressionAttributeValues: {
    ":user_pk_prefix": `${USER_ID_PREFIX_STR}#`,
  },
});

items.forEach((dbItem) => {
  // prettier-ignore
  const {
    pk: id, data: email, handle, phone = null, profile, createdAt, updatedAt,
  } = dbItem as UnaliasedUserItem

  if (id && email && handle) {
    // Only users' public fields are cached for search
    initialCacheEntries.push([handle, { id, email, handle, phone, profile, createdAt, updatedAt }]);
  }
});

/**
 * API local cache for searching Users by `User.handle`.
 *
 * > Only public {@link Contact} fields are stored.
 */
export const usersCache = new Cache<UsersCacheObject>(initialCacheEntries);
