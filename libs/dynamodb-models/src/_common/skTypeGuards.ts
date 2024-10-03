import { CONTACT_SK_PREFIX_STR } from "../Contact/regex.js";
import { INVOICE_SK_PREFIX_STR } from "../Invoice/regex.js";
import { PW_RESET_TOKEN_SK_PREFIX_STR } from "../PasswordResetToken/regex.js";
import { USER_SK_PREFIX_STR } from "../User/regex.js";
import { SCA_SK_PREFIX_STR } from "../UserStripeConnectAccount/regex.js";
import { SUB_SK_PREFIX_STR } from "../UserSubscription/regex.js";
import { WO_SK_PREFIX_STR } from "../WorkOrder/regex.js";
import type { ContactItem } from "../Contact/Contact.js";
import type { InvoiceItem } from "../Invoice/Invoice.js";
import type { PasswordResetTokenItem as PwResetTokenItem } from "../PasswordResetToken/PasswordResetToken.js";
import type { UserItem } from "../User/User.js";
import type { UserStripeConnectAccountItem as UserSCAModelItem } from "../UserStripeConnectAccount/UserStripeConnectAccount.js";
import type { UserSubscriptionItem as UserSubModelItem } from "../UserSubscription/UserSubscription.js";
import type { WorkOrderItem } from "../WorkOrder/WorkOrder.js";

/**
 * Functions which ascertain whether a given string is a valid `sk` value for an
 * internal-db type.
 */
const isSKofType = {
  contact: (str?: string) => !!str && str.startsWith(`${CONTACT_SK_PREFIX_STR}#`),
  invoice: (str?: string) => !!str && str.startsWith(`${INVOICE_SK_PREFIX_STR}#`),
  user: (str?: string) => !!str && str.startsWith(`${USER_SK_PREFIX_STR}#`),
  sca: (str?: string) => !!str && str.startsWith(`${SCA_SK_PREFIX_STR}#`),
  subscription: (str?: string) => !!str && str.startsWith(`${SUB_SK_PREFIX_STR}#`),
  workOrder: (str?: string) => !!str && str.startsWith(`${WO_SK_PREFIX_STR}#`),
  pwResetToken: (str?: string) => !!str && str.startsWith(`${PW_RESET_TOKEN_SK_PREFIX_STR}#`),
};

/**
 * Type-guard functions which ascertain whether a given object is of a certain
 * internal-database type using the object's `sk` attribute value. For example,
 * `skTypeGuards.isUser` determines if an object is a `UserItem`.
 */
// prettier-ignore
export const skTypeGuards = {
  isContact: (obj: SkTypeGuardArg): obj is ContactItem => isSKofType.contact(obj.sk),
  isInvoice: (obj: SkTypeGuardArg): obj is InvoiceItem => isSKofType.invoice(obj.sk),
  isUser: (obj: SkTypeGuardArg): obj is UserItem => isSKofType.user(obj.sk),
  isUserSCA: (obj: SkTypeGuardArg): obj is UserSCAModelItem => isSKofType.sca(obj.sk),
  isUserSubscription: (obj: SkTypeGuardArg): obj is UserSubModelItem => isSKofType.subscription(obj.sk),
  isWorkOrder: (obj: SkTypeGuardArg): obj is WorkOrderItem => isSKofType.workOrder(obj.sk),
  isPwResetToken: (obj: SkTypeGuardArg): obj is PwResetTokenItem => isSKofType.pwResetToken(obj.sk),
};

interface SkTypeGuardArg {
  sk?: string;
  [K: PropertyKey]: unknown;
}
