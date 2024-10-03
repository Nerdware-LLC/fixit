import { BaseMutationResponse, type BaseMutationResponseParams } from "./BaseMutationResponse.js";
import type { DeleteMutationResponse as DeleteMutationResponseType } from "@fixit/api-schemas/GraphQL/types";
import type { Simplify } from "type-fest";

/**
 * A mutation response class for delete operations.
 */
export class DeleteMutationResponse
  extends BaseMutationResponse
  implements DeleteMutationResponseType
{
  static readonly __typename = "DeleteMutationResponse";

  readonly __typename = DeleteMutationResponse.__typename;

  id: string;

  constructor({ id, ...mutationResponseArgs }: DeleteMutationResponseParams) {
    super(mutationResponseArgs);
    this.id = id;
  }
}

/**
 * Constructor params for a {@link DeleteMutationResponse}.
 */
export type DeleteMutationResponseParams = Simplify<
  BaseMutationResponseParams & {
    /** The ID of the deleted entity. */
    id: string;
  }
>;
