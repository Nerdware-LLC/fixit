import { BaseMutationResponse, type BaseMutationResponseParams } from "./BaseMutationResponse.js";
import type { MutationResponse as MutationResponseType } from "@fixit/api-schemas/GraphQL/types";

/**
 * A generic mutation response class.
 */
export class MutationResponse extends BaseMutationResponse implements MutationResponseType {
  static readonly __typename = "MutationResponse";

  readonly __typename = MutationResponse.__typename;
}

/**
 * Constructor params for a {@link MutationResponse}.
 */
export type MutationResponseParams = BaseMutationResponseParams;
