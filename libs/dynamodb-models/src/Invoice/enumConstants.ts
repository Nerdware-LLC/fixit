import type { InvoiceStatus } from "@fixit/api-schemas/GraphQL/types";

export const INVOICE_ENUM_CONSTANTS: {
  readonly STATUSES: ReadonlyArray<InvoiceStatus>;
} = {
  STATUSES: ["OPEN", "CLOSED", "DISPUTED"] as const,
} as const;
