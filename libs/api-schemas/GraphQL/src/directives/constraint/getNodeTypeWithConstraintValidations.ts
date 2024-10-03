import { GraphQLNonNull, GraphQLList } from "graphql";
import { ConstrainedScalarType } from "./ConstrainedScalarType.js";
import { getConstrainedScalarTypeName } from "./getConstrainedScalarTypeName.js";
import { getSchemaNodeTypeMetadata } from "./getSchemaNodeTypeMetadata.js";
import type { SupportedSchemaNodeType, ConstraintDirectiveArgs } from "./types.js";

const CONSTRAINED_TYPES_GLOBAL_REGISTRY: Record<symbol, SupportedSchemaNodeType> = {};

/**
 * Wraps a schema node's type with constraint validations.
 */
export const getNodeTypeWithConstraintValidations = (
  fieldName: string,
  schemaNodeType: SupportedSchemaNodeType,
  constraintDirectiveArgs: ConstraintDirectiveArgs
): SupportedSchemaNodeType => {
  const schemaNodeTypeMetadata = getSchemaNodeTypeMetadata(schemaNodeType);

  const constrainedScalarTypeName = getConstrainedScalarTypeName(
    fieldName,
    schemaNodeTypeMetadata,
    constraintDirectiveArgs
  );

  const constrainedTypeName_GLOBAL_ID = Symbol.for(constrainedScalarTypeName);

  // See if the constraint-type has already been created, if so, use it and return early:
  if (Object.hasOwn(CONSTRAINED_TYPES_GLOBAL_REGISTRY, constrainedTypeName_GLOBAL_ID)) {
    return CONSTRAINED_TYPES_GLOBAL_REGISTRY[constrainedTypeName_GLOBAL_ID]!;
  }

  const { scalarType, list, scalarNotNull, listNotNull } = schemaNodeTypeMetadata;

  // Start forming the returned constrained-type at the scalar level:
  let constrainedType: SupportedSchemaNodeType = ConstrainedScalarType.create(
    fieldName,
    constrainedScalarTypeName,
    scalarType,
    constraintDirectiveArgs
  );

  // Re-wrap the scalar type in GraphQLNonNull and/or GraphQLList if necessary:

  if (scalarNotNull) {
    constrainedType = new GraphQLNonNull(constrainedType);
  }
  if (list) {
    constrainedType = new GraphQLList(constrainedType);

    if (listNotNull) {
      constrainedType = new GraphQLNonNull(constrainedType);
    }
  }

  // Add the constrained scalar type to the global registry:
  CONSTRAINED_TYPES_GLOBAL_REGISTRY[constrainedTypeName_GLOBAL_ID] = constrainedType;

  return constrainedType;
};
