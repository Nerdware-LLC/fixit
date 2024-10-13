import { ContactIDGraphQLScalar } from "./ContactID.js";
import { DateTimeGraphQLScalar } from "./DateTime.js";
import { InvoiceIDGraphQLScalar } from "./InvoiceID.js";
import { UserIDGraphQLScalar } from "./UserID.js";
import { WorkOrderChecklistItemIDGraphQLScalar } from "./WorkOrderChecklistItemID.js";
import { WorkOrderIDGraphQLScalar } from "./WorkOrderID.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

/**
 * Resolvers for custom GraphQL scalars
 */
export const resolvers: Resolvers = {
  // GENERAL SCALARS
  DateTime: DateTimeGraphQLScalar,

  // ID SCALARS
  ContactID: ContactIDGraphQLScalar,
  InvoiceID: InvoiceIDGraphQLScalar,
  UserID: UserIDGraphQLScalar,
  WorkOrderID: WorkOrderIDGraphQLScalar,
  WorkOrderChecklistItemID: WorkOrderChecklistItemIDGraphQLScalar,
};
