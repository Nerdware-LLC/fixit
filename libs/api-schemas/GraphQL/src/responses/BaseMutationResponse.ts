import type { BaseMutationResponse as BaseMutationResponseInterface } from "@fixit/api-schemas/GraphQL/types";

/**
 * An abstract class for GQL mutation responses.
 */
export abstract class BaseMutationResponse implements BaseMutationResponseInterface {
  abstract readonly __typename: string;

  success: BaseMutationResponseInterface["success"];
  code?: Exclude<BaseMutationResponseInterface["code"], undefined>;
  message?: Exclude<BaseMutationResponseInterface["message"], undefined>;

  constructor({ success, code, message }: BaseMutationResponseParams) {
    this.success = success;
    if (code) this.code = code;
    if (message) this.message = message;
  }
}

/**
 * Constructor params for a {@link BaseMutationResponse|MutationResponse}.
 */
export type BaseMutationResponseParams = BaseMutationResponseInterface;
