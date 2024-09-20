import { GraphQLScalarType, Kind } from "graphql";
import { isValidTimestamp } from "@fixit/timestamp-utils";
import { getScalarErrMsg } from "../helpers.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Custom DateTime scalar with handling for Date objects and datetime strings",

    // parseValue = value from the client
    parseValue(value: unknown) {
      if (!isValidTimestamp(value)) {
        const errMsg = getScalarErrMsg("DateTime", value);
        throw new TypeError(errMsg);
      }
      return value;
    },

    // serialize = value sent to the client
    serialize(value: unknown) {
      if (!isValidTimestamp(value)) {
        const errMsg = getScalarErrMsg("DateTime", value);
        throw new TypeError(errMsg);
      }
      return value;
    },

    // ast value is always in string format
    parseLiteral(ast) {
      return ast.kind === Kind.INT ? new Date(ast.value) : null;
    },
  }),
};
