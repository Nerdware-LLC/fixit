import type { SchemaNodeTypeMetadata } from "./getSchemaNodeTypeMetadata.js";
import type { ConstraintDirectiveArgs } from "./types.js";

/**
 * Returns a name for a constrained scalar type derived from the underlying
 * field's name, schema type, and `@constraint` directive arguments.
 *
 * The resultant value is used to create custom scalar types for constraint validation.
 *
 * > **Note:** Names must match `/^[_a-zA-Z][_a-zA-Z0-9]*$/` as per graphql-js
 */
export const getConstrainedScalarTypeName = (
  fieldName: string,
  { scalarType, list, scalarNotNull, listNotNull }: SchemaNodeTypeMetadata,
  constraintDirectiveArgs: ConstraintDirectiveArgs
): string => {
  let constrainedScalarTypeName = `${fieldName}_`;

  if (list) constrainedScalarTypeName += "List_";

  if (listNotNull) constrainedScalarTypeName += "ListNotNull_";

  constrainedScalarTypeName += `${scalarType.name}_`;

  if (scalarNotNull) constrainedScalarTypeName += "NotNull_";

  constrainedScalarTypeName += Object.entries(constraintDirectiveArgs)
    .sort() // Sort by key to ensure @constraint arg order doesn't impact the type name
    .map(
      ([key, value]) =>
        `${key}_${value.toString().replace(/\W/g, /^(min|max)$/.test(key) ? "dot" : "")}`
    )
    .join("_");

  return constrainedScalarTypeName;
};
