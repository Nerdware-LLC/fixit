import type { ConstraintViolation } from "../ConstraintValidationError.js";
import type {
  ConstraintDirectiveArgName,
  ConstraintRuntimeValue,
  ConstraintDirectiveArgValueTypesMap,
  StringConstraintDirectiveArgName,
  NumberConstraintDirectiveArgName,
} from "../types.js";

/**
 * A constraint validator function takes a constraint argument value and a runtime value. If the
 * runtime value violates the constraint, the function should return a {@link ConstraintViolation}.
 */
export type BaseConstraintValidator<
  C extends string | number = any, // eslint-disable-line @typescript-eslint/no-explicit-any
  V extends string | number = any, // eslint-disable-line @typescript-eslint/no-explicit-any
> = (constraintArg: C, value: V) => ConstraintViolation | undefined;

/**
 * A {@link BaseConstraintValidator} function for a specific constraint argument.
 */
export type ConstraintValidator<ConstraintName extends ConstraintDirectiveArgName> =
  BaseConstraintValidator<
    ConstraintDirectiveArgValueTypesMap[ConstraintName],
    ConstraintRuntimeValue<ConstraintName>
  >;

/**
 * A map of constraint argument names to their respective {@link ConstraintValidator} functions.
 *
 * > Constraint validator maps are organized by the runtime value type they validate.
 */
export type ConstraintValidatorsMap<RuntimeValueType extends string | number> =
  RuntimeValueType extends string
    ? {
        readonly [StringConstraint in StringConstraintDirectiveArgName]: ConstraintValidator<StringConstraint>;
      }
    : RuntimeValueType extends number
      ? {
          readonly [NumberConstraint in NumberConstraintDirectiveArgName]: ConstraintValidator<NumberConstraint>;
        }
      : never;
