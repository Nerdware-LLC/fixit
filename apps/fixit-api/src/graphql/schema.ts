import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@fixit/api-schemas/GraphQL/__generated__.graphqlSchemaTypeDefs.js";
import { applyConstraintDirectiveToSchema } from "@fixit/api-schemas/GraphQL/directives/constraint";
import { resolvers } from "./resolvers.js";
import type { ApolloServerContext } from "@fixit/apollo-graphql/types";

// The base schema returned by `makeExecutableSchema`:
const baseExecutableSchema = makeExecutableSchema<ApolloServerContext>({
  typeDefs,
  resolvers,
});

/**
 * Fixit API GraphQL Schema
 */
export const schema = applyConstraintDirectiveToSchema(baseExecutableSchema);
