import { isScalarType, isListType, isNonNullType, type GraphQLScalarType } from "graphql";
import type { SupportedSchemaNodeType } from "./types.js";

/**
 * Metadata about a schema node's `type`.
 */
export type SchemaNodeTypeMetadata = {
  scalarType: GraphQLScalarType;
  scalarNotNull?: boolean;
  list?: boolean;
  listNotNull?: boolean;
};

/**
 * Returns metadata about the GraphQL type of the provided `node.type`.
 */
export const getSchemaNodeTypeMetadata = (
  nodeTypeObj: SupportedSchemaNodeType
): SchemaNodeTypeMetadata => {
  if (isScalarType(nodeTypeObj)) return { scalarType: nodeTypeObj };

  if (isListType(nodeTypeObj))
    return { ...getSchemaNodeTypeMetadata(nodeTypeObj.ofType), list: true };

  if (isNonNullType(nodeTypeObj)) {
    if (isScalarType(nodeTypeObj.ofType)) {
      return { scalarType: nodeTypeObj.ofType, scalarNotNull: true };
    }

    return { ...getSchemaNodeTypeMetadata(nodeTypeObj.ofType), list: true, listNotNull: true };
  }

  throw new Error(`Not a valid scalar type: ${nodeTypeObj.toString()}`);
};
