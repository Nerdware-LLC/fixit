import { mapSchema, MapperKind, getDirective, type DirectableObject } from "@graphql-tools/utils";
import { getNodeTypeWithConstraintValidations } from "./getNodeTypeWithConstraintValidations.js";
import type { GraphQLSchema } from "graphql";
import type { ConstraintDirectiveArgs, SupportedMapperNodeParam } from "./types.js";

/**
 * Checks if the schema node (field or argument) has a `@constraint` directive, and if
 * so, wraps the node's `type` in a custom scalar that implements validation logic
 * based on the directive's arguments.
 */
const applyConstraintDirectiveToNode = (
  schema: GraphQLSchema,
  fieldOrArgConfig: SupportedMapperNodeParam,
  fieldName: string
) => {
  const constraintDirectiveArgs = getDirective(
    schema,
    fieldOrArgConfig as DirectableObject, // Cast is necessary here bc @graphql-tools's typings weren't designed to work with exactOptionalPropertyTypes
    "constraint"
  )?.[0] as ConstraintDirectiveArgs | undefined;

  if (constraintDirectiveArgs) {
    const constrainedNodeType = getNodeTypeWithConstraintValidations(
      fieldName,
      fieldOrArgConfig.type,
      constraintDirectiveArgs
    );

    fieldOrArgConfig.type = constrainedNodeType;

    return fieldOrArgConfig;
  }
};

/**
 * Transforms the provided `schema` by applying `@constraint` directive
 * validation logic to the following schema node types:
 *
 * | Schema Node Type     | Corresponding SDL Directive Location |
 * | :------------------- | :----------------------------------- |
 * | `ARGUMENT`           | `ARGUMENT_DEFINITION`                |
 * | `INPUT_OBJECT_FIELD` | `INPUT_FIELD_DEFINITION`             |
 */
export const applyConstraintDirectiveToSchema = (schema: GraphQLSchema): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.ARGUMENT]: (argumentConfig, fieldName) => {
      return applyConstraintDirectiveToNode(schema, argumentConfig, fieldName);
    },
    [MapperKind.INPUT_OBJECT_FIELD]: (inputFieldConfig, fieldName) => {
      return applyConstraintDirectiveToNode(schema, inputFieldConfig, fieldName);
    },
  });
};
