import type { InvoiceStatus } from "@fixit/api-schemas/GraphQL/types";

/**
 * A map of all Invoice enums.
 */
export const INVOICE_ENUM_CONSTANTS = {
  STATUSES: ["OPEN", "CLOSED", "DISPUTED"] as const,
} as const satisfies {
  readonly STATUSES: ReadonlyArray<InvoiceStatus>;
};
