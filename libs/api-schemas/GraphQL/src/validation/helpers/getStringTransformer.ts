import { z as zod } from "zod";

/**
 * This function returns a Zod `.transform()` function that sanitizes and validates a string value.
 */
export const getStringTransformer = ({
  fieldDescription,
  sanitize,
  isValid,
}: {
  fieldDescription: string;
  sanitize: (v: string) => string;
  isValid: (v?: unknown) => boolean;
}) => {
  // Return a Zod `.transform()` function that sanitizes and validates a string value.
  return <V extends string | null | undefined>(value: V, ctx: zod.RefinementCtx) => {
    if (!value) return value;

    const sanitizedValue = sanitize(value);

    if (!isValid(sanitizedValue)) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: `Invalid ${fieldDescription}`,
        fatal: true,
      });
      return zod.NEVER;
    }

    return sanitizedValue;
  };
};
