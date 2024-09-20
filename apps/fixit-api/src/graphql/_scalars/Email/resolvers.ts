import { isValidEmail } from "@nerdware/ts-string-helpers";
import { GraphQLScalarType, Kind } from "graphql";
import { getScalarErrMsg } from "../helpers.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  Email: new GraphQLScalarType({
    name: "Email",
    description: "Custom Email scalar with regex validation",

    // parseValue = value from the client
    parseValue(value: unknown) {
      if (!isValidEmail(value)) {
        const errMsg = getScalarErrMsg("Email", value);
        throw new TypeError(errMsg);
      }
      return value;
    },

    // serialize = value sent to the client
    serialize(value: unknown) {
      if (!isValidEmail(value)) {
        const errMsg = getScalarErrMsg("Email", value);
        throw new TypeError(errMsg);
      }
      return value;
    },

    // ast value is always in string format
    parseLiteral(ast) {
      return ast.kind === Kind.STRING ? ast.value : null;
    },
  }),
};
