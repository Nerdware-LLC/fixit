import { safeJsonStringify } from "@utils/typeSafety";

/**
 * GQL Custom Scalar Helper Methods
 */
export const helpers = {
  getScalarErrMsg: (scalarType: string, invalidValue: unknown) => {
    // prettier-ignore
    return `[${scalarType.toUpperCase()} SCALAR ERROR]: Client provided an invalid ${scalarType.toLowerCase()}: ${safeJsonStringify(invalidValue)}`;
  },
};
