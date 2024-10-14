import { isValidEmail, isValidHandle, isValidPhone, isValidURL } from "@nerdware/ts-string-helpers";
import { isValidUUID } from "@fixit/uuid";
import type { SupportedConstraintFormat } from "@fixit/api-schemas/GraphQL/types";
import type { ConstraintValidatorsMap } from "./types.js";

const STRING_FORMAT_VALIDATORS: Readonly<
  Record<SupportedConstraintFormat, { isValid: (value?: unknown) => boolean; description: string }>
> = {
  email: { isValid: isValidEmail, description: "email address" },
  handle: { isValid: isValidHandle, description: `social media handle (e.g., "@foo_user")` },
  phone: { isValid: isValidPhone, description: "10-digit US phone number" },
  url: { isValid: isValidURL, description: "URL" },
  uuid: { isValid: isValidUUID, description: "UUID" },
};

export const STRING_CONSTRAINT_VALIDATORS: ConstraintValidatorsMap<string> = {
  minLength: (minLength, str) => {
    if (str.length < minLength)
      return {
        name: "minLength",
        value: minLength,
        message: `must be at least ${minLength} characters in length`,
      };
  },
  maxLength: (maxLength, str) => {
    if (str.length > maxLength)
      return {
        name: "maxLength",
        value: maxLength,
        message: `must not exceed ${maxLength} characters in length`,
      };
  },
  startsWith: (startsWith, str) => {
    if (!str.startsWith(startsWith))
      return {
        name: "startsWith",
        value: startsWith,
        message: `must start with "${startsWith}"`,
      };
  },
  endsWith: (endsWith, str) => {
    if (!str.endsWith(endsWith))
      return {
        name: "endsWith",
        value: endsWith,
        message: `must end with "${endsWith}"`,
      };
  },
  contains: (contains, str) => {
    if (!str.includes(contains))
      return {
        name: "contains",
        value: contains,
        message: `must contain substring "${contains}"`,
      };
  },
  notContains: (notContains, str) => {
    if (str.includes(notContains))
      return {
        name: "notContains",
        value: notContains,
        message: `must not contain substring "${notContains}"`,
      };
  },
  pattern: (pattern, str) => {
    if (!new RegExp(pattern).test(str))
      return {
        name: "pattern",
        value: pattern,
        message: `must match pattern /${pattern}/`,
      };
  },
  format: (format, str) => {
    if (!STRING_FORMAT_VALIDATORS[format].isValid(str))
      return {
        name: "format",
        value: format,
        message: `must be a valid ${STRING_FORMAT_VALIDATORS[format].description}`,
      };
  },
};
