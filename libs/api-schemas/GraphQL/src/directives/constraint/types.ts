import type { ConstraintDirectiveArgs as BaseConstraintDirectiveArgs } from "@fixit/api-schemas/GraphQL/types";
import type { MapperKind, SchemaMapper } from "@graphql-tools/utils";
import type { Simplify } from "type-fest";

///////////////////////////////////////////////////////////////////////////////
// @constraint directive argument names

/** Union of `@constraint` directive argument names. */
export type ConstraintDirectiveArgName = Simplify<keyof BaseConstraintDirectiveArgs>;

/** Union of `@constraint` directive argument names for string scalar values. */
export type StringConstraintDirectiveArgName = "minLength" | "maxLength" | "startsWith" | "endsWith" | "contains" | "notContains" | "pattern" | "format"; // prettier-ignore

/** Union of `@constraint` directive argument names for number scalar values. */
export type NumberConstraintDirectiveArgName = "min" | "max";

///////////////////////////////////////////////////////////////////////////////
// @constraint directive argument-value types

/**
 * Map of `@constraint` directive arguments to the type of their respective _**argument values**_.
 * For example, `minLength` is used to validate _**runtime values**_ of type `string`, but its
 * _**argument value**_ must be a `number`.
 */
export type ConstraintDirectiveArgValueTypesMap = {
  [Key in ConstraintDirectiveArgName]: BaseConstraintDirectiveArgs[Key] extends infer Scalar
    ? Scalar extends number
      ? number
      : Scalar extends string
        ? string extends Scalar // <-- tests for literals and/or unions
          ? string
          : Scalar
        : never
    : never;
};

/** Partial {@link ConstraintDirectiveArgValueTypesMap}. */
export type ConstraintDirectiveArgs = Partial<ConstraintDirectiveArgValueTypesMap>;

///////////////////////////////////////////////////////////////////////////////
// @constraint directive argument — runtime value types

/**
 * Generic type which takes a {@link ConstraintDirectiveArgName} and returns the type of
 * _**runtime value**_ the argument validates (e.g., `"min"` validates `number` values).
 */
export type ConstraintRuntimeValue<ConstraintName extends ConstraintDirectiveArgName> =
  ConstraintName extends StringConstraintDirectiveArgName
    ? string
    : ConstraintName extends NumberConstraintDirectiveArgName
      ? number
      : never;

///////////////////////////////////////////////////////////////////////////////
// SchemaMapper types

/**
 * {@link SchemaMapper} with supported `MapperKind` fields.
 *
 * The `@constraint` SDL includes the following directive locations:
 *
 * | `@constraint` Directive Location &ensp; | {@link MapperKind} &ensp; | Mapper Type      |
 * | :-------------------------------------- | :------------------------ | :--------------- |
 * | `ARGUMENT_DEFINITION`                   | `ARGUMENT`                | ArgumentMapper   |
 * | `INPUT_FIELD_DEFINITION`                | `INPUT_OBJECT_FIELD`      | InputFieldMapper |
 */
export type SupportedSchemaMapper = Pick<
  SchemaMapper,
  MapperKind.ARGUMENT | MapperKind.INPUT_OBJECT_FIELD
>;

/** Union of supported `MapperType` types for `@constraint` directive locations. */
export type SupportedMapperType = Required<SupportedSchemaMapper>[keyof SupportedSchemaMapper];

/** The first parameter of a supported `MapperType`, e.g., an `GraphQLInputFieldConfig` object. */
export type SupportedMapperNodeParam = Parameters<SupportedMapperType>[0];

/** The `node.type` field of {@link SupportedMapperNodeParam} objects. */
export type SupportedSchemaNodeType = SupportedMapperNodeParam["type"];
