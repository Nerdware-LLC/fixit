import { CONTACT_SK_PREFIX_STR } from "@fixit/dynamodb-models/Contact";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";
import type {
  PublicUserFieldsTypeResolverParentParam,
  PublicUserFieldsPossibleTypename,
} from "@fixit/api-schemas/GraphQL/types/PublicUserFieldsCodegen.js";

export const resolvers: Resolvers = {
  PublicUserFields: {
    __resolveType: (
      obj: PublicUserFieldsTypeResolverParentParam
    ): PublicUserFieldsPossibleTypename => {
      return obj.__typename
        ? obj.__typename
        : obj.id.startsWith(CONTACT_SK_PREFIX_STR)
          ? "Contact"
          : "User";
    },
  },
};
