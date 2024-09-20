import { CONTACT_SK_PREFIX_STR } from "@fixit/dynamodb-models/Contact";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  PublicUserFields: {
    __resolveType: (obj): "User" | "Contact" => {
      return "__typename" in obj
        ? (obj as { __typename: "User" | "Contact" }).__typename
        : (obj as { id: string }).id.startsWith(CONTACT_SK_PREFIX_STR)
          ? "Contact"
          : "User";
    },
  },
};
