import { MutationResponse, type MutationResponseParams } from "./MutationResponse.js";
import type { DeleteMutationResponse as DeleteMutationResponseType } from "@fixit/api-schemas/GraphQL/types";
import type { Simplify } from "type-fest";

/**
 * A mutation response class for delete operations.
 */
export class DeleteMutationResponse extends MutationResponse implements DeleteMutationResponseType {
  id: string;

  constructor({ success, id }: DeleteMutationResponseParams) {
    super({ success });
    this.id = id;
  }
}

/**
 * Constructor params for a {@link DeleteMutationResponse}.
 */
export type DeleteMutationResponseParams = Simplify<
  MutationResponseParams & {
    /** The ID of the deleted entity. */
    id: string;
  }
>;
