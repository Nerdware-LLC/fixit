import checklist from "./Checklist.js";
import contact from "./Contact.js";
import graphQLError from "./GraphQLError.js";
import invite from "./Invite.js";
import invoice from "./Invoice.js";
import location from "./Location.js";
import profile from "./Profile.js";
import publicUserFields from "./PublicUserFields.js";
import user from "./User.js";
import userStripeConnectAccount from "./UserStripeConnectAccount.js";
import userSubscription from "./UserSubscription.js";
import workOrder from "./WorkOrder.js";
import responses from "./_responses.js";
import root from "./_root.js";
import customScalars from "./_scalars.js";

/**
 * Fixit API — GraphQL Schema TypeDefs
 */
export const typeDefs: Array<string> = [
  // ROOTS, SCALARS, RESPONSES, & OTHER META TYPES:
  root,
  customScalars,
  responses,
  graphQLError,
  // CORE ITEM INTERFACES:
  publicUserFields,
  // CORE ITEMS:
  checklist,
  contact,
  invoice,
  location,
  profile,
  userStripeConnectAccount,
  user,
  userSubscription,
  workOrder,
  // OTHER TYPES:
  invite,
];
