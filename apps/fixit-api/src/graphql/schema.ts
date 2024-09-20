import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@fixit/api-schemas/GraphQL/typeDefs";
import { resolvers } from "./resolvers.js";

/**
 * Fixit API GraphQL Schema
 */
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
