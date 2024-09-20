import type { MutationResponse as MutationResponseType } from "@fixit/api-schemas/GraphQL/types";

/**
 * A generic mutation response class.
 */
export class MutationResponse implements MutationResponseType {
  success: boolean;

  constructor({ success }: MutationResponseParams) {
    this.success = success;
  }
}

/**
 * Constructor params for a {@link MutationResponse}.
 */
export type MutationResponseParams = {
  /** Whether the mutation was successful. */
  success: boolean;
};
