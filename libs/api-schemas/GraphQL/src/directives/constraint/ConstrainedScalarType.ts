import {
  GraphQLScalarType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  type ValueNode,
} from "graphql";
import {
  ConstraintValidationError,
  type ConstraintViolations,
} from "./ConstraintValidationError.js";
import {
  STRING_CONSTRAINT_VALIDATORS,
  NUMBER_CONSTRAINT_VALIDATORS,
} from "./constraintValidators/index.js";
import type { BaseConstraintValidator } from "./constraintValidators/index.js";
import type { ConstraintDirectiveArgs } from "./types.js";

/**
 * A custom "constrained" GQL scalar type that wraps an underlying {@link GraphQLScalarType} with
 * logical constraint validations determined by the provided `@constraint` directive arguments.
 */
export class ConstrainedScalarType<
  ScalarType extends string | number,
> extends GraphQLScalarType<ScalarType> {
  /**
   * Create a new ConstrainedScalarType object.
   */
  public static readonly create = (
    fieldName: string,
    constrainedScalarTypeName: string,
    scalarType: GraphQLScalarType,
    constraintDirectiveArgs: ConstraintDirectiveArgs
  ) => {
    if (scalarType === GraphQLString || scalarType === GraphQLID)
      return new ConstrainedScalarType<string>(
        constrainedScalarTypeName,
        scalarType as GraphQLScalarType<string>,
        getConstrainedRuntimeValueValidator(
          fieldName,
          constraintDirectiveArgs,
          STRING_CONSTRAINT_VALIDATORS
        )
      );

    if (scalarType === GraphQLFloat || scalarType === GraphQLInt)
      return new ConstrainedScalarType<number>(
        constrainedScalarTypeName,
        scalarType as GraphQLScalarType<number>,
        getConstrainedRuntimeValueValidator(
          fieldName,
          constraintDirectiveArgs,
          NUMBER_CONSTRAINT_VALIDATORS
        )
      );

    throw new Error(
      `The @constraint directive does not currently support fields of type ${scalarType.toString()}.`
    );
  };

  constructor(
    constrainedScalarTypeName: string,
    scalarType: GraphQLScalarType<ScalarType>,
    validateValue: (value: ScalarType) => void
  ) {
    super({
      ...scalarType,
      name: constrainedScalarTypeName,
      parseValue(value: unknown) {
        const parsedValue = scalarType.parseValue(value);
        validateValue(parsedValue);
        return parsedValue;
      },
      parseLiteral(ast: ValueNode) {
        const parsedValue = scalarType.parseLiteral(ast);
        validateValue(parsedValue);
        return parsedValue;
      },
    });
  }
}

/**
 * Validate a constrained value against the provided constraints.
 */
const getConstrainedRuntimeValueValidator = (
  fieldName: string,
  constraintDirectiveArgs: Record<string, string | number>,
  constraintValidators: Record<string, BaseConstraintValidator>
) => {
  // Store an array of the @constraint directive's arg names for re-use:
  const constraintArgNames = Object.keys(constraintDirectiveArgs);

  // Ensure the constraint directive args are valid:
  if (constraintArgNames.some((arg) => !Object.hasOwn(constraintValidators, arg))) {
    throw new Error(
      `The constraint directive on field "${fieldName}" contains one or more invalid arguments for fields of its type.`
    );
  }

  // Return a function that validates a runtime value against the constraints:
  return (value: unknown) => {
    // Initialize array to hold any constraint violations:
    const constraintViolations: ConstraintViolations = [];

    // Check for constraint violations:
    for (const constraintArg of constraintArgNames) {
      // Get the validator function for the constraint:
      const checkIfValueViolatesConstraint = constraintValidators[constraintArg]!;

      // Run the validator for the constraint:
      const violation = checkIfValueViolatesConstraint(
        constraintDirectiveArgs[constraintArg]!,
        value
      );

      // If there was a violation, add it to the array:
      if (violation) constraintViolations.push(violation);
    }

    // Check for constraint violations:
    if (constraintViolations.length > 0) {
      throw new ConstraintValidationError(fieldName, { violations: constraintViolations });
    }
  };
};
