import type { User, Contact } from "@fixit/api-schemas/GraphQL/types";

/**
 * This type is only for use in the `codegen` config file (see `<project-root>/codegen.ts`)
 *
 * This type is only used in the `codegen` config file under the `"mappers"` config to ensure
 * the `@graphql-codegen/typescript-resolvers` pkg resolves the `PublicUserFields` interface to
 * the GQL schema types, `User | Contact`, rather than the DB-model types `UserItem | ContactItem`.
 */
export type PublicUserFieldsCodegenMapper = User | Contact;

/**
 * This type reflects the `PublicUserFields` union with `__typename` added back in to all
 * constituent types (the `__typename` field is omitted from generated types).
 *
 * This type is used as the `parent` parameter type for the `PublicUserFields` type-resolver
 * function (`__resolveType`).
 */
export type PublicUserFieldsTypeResolverParentParam =
  | (User & { __typename?: "User" })
  | (Contact & { __typename?: "Contact" });

/**
 * This type reflects the possible `__typename` values for the `PublicUserFields` type; it is used
 * as the return type for the `PublicUserFields` type-resolver function (`__resolveType`).
 */
export type PublicUserFieldsPossibleTypename = NonNullable<
  PublicUserFieldsTypeResolverParentParam["__typename"]
>;
