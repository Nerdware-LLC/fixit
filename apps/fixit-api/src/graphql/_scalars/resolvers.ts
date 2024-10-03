import { Kind } from "graphql";
import { scalarResolverFactory } from "@fixit/api-schemas/GraphQL/scalars";
import { isValidTimestamp } from "@fixit/timestamp-utils";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

// Note: For the `parseLiteral` fns, `ast.value` is always in string format

export const resolvers: Resolvers = {
  DateTime: scalarResolverFactory({
    name: "DateTime",
    description: "Custom DateTime scalar with handling for Date objects and datetime strings",
    isValid: isValidTimestamp,
    parseLiteral: (ast) => (ast.kind === Kind.INT ? new Date(ast.value) : null),
  }),
};
