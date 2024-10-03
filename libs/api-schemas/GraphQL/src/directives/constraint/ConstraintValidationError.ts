import type { ConstraintDirectiveArgName } from "./types.js";

/** An object providing contextual details regarding `@constraint` directive violations. */
export type ConstraintValidationErrorContext = {
  violations: ConstraintViolations;
};

/** An array of {@link ConstraintViolation} objects. */
export type ConstraintViolations = Array<ConstraintViolation>;

/** An object with info regarding a specific `@constraint` directive violation. */
export type ConstraintViolation = {
  /** The name of the `@constraint` directive argument that was violated. */
  name: ConstraintDirectiveArgName;
  /** The value of the `@constraint` directive argument that was violated. */
  value: unknown;
  /** A message conveying info to the user about the violation. */
  message: string;
};

/**
 * Error thrown when a constraint directive is violated.
 */
export class ConstraintValidationError extends Error {
  override readonly name: string; // 'name' is overridden to make it readonly
  readonly code: string = "ERR_GRAPHQL_CONSTRAINT_VALIDATION";
  readonly fieldName: string;
  readonly context: ConstraintValidationErrorContext;

  constructor(fieldName: string, context: ConstraintValidationErrorContext) {
    // Create a message that lists all the violations:
    const message = [
      `The input to field "${fieldName}" violates the following constraints:`,
      ...context.violations.map(({ message }) => `The value for field "${fieldName}" ${message}.`),
    ].join(`\n\t• `);

    super(message);
    this.name = this.constructor.name;
    this.fieldName = fieldName;
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}
