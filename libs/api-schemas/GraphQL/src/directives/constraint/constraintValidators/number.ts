import type { ConstraintValidatorsMap } from "./types.js";

export const NUMBER_CONSTRAINT_VALIDATORS: ConstraintValidatorsMap<number> = {
  min: (min, value) => {
    if (value < min) {
      return { name: "min", value: min, message: `must not be less than ${min}` };
    }
  },
  max: (max, value) => {
    if (value > max) {
      return { name: "max", value: max, message: `must not be more than ${max}` };
    }
  },
};
