// @ts-nocheck
import { z } from 'zod'
import type { BaseMutationResponse, ChecklistItem, Contact, CreateChecklistItemInput, CreateWorkOrderInput, DeleteMutationResponse, Invoice, InvoiceInput, InvoiceStatus, Location, LocationInput, MutationResponse, MyInvoicesQueryResponse, MyWorkOrdersQueryResponse, Profile, ProfileInput, PublicUserFields, SubscriptionPriceName, SubscriptionStatus, SupportedConstraintFormat, UpdateChecklistItemInput, UpdateWorkOrderInput, User, UserStripeConnectAccount, UserSubscription, WorkOrder, WorkOrderCategory, WorkOrderPriority, WorkOrderStatus } from '@fixit/api-schemas/GraphQL/types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const InvoiceStatusSchema = z.enum(['CLOSED', 'DISPUTED', 'OPEN']);

export const SubscriptionPriceNameSchema = z.enum(['ANNUAL', 'MONTHLY', 'TRIAL']);

export const SubscriptionStatusSchema = z.enum(['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid']);

export const SupportedConstraintFormatSchema = z.enum(['email', 'handle', 'phone', 'url', 'uuid']);

export const WorkOrderCategorySchema = z.enum(['DRYWALL', 'ELECTRICAL', 'FLOORING', 'GENERAL', 'HVAC', 'LANDSCAPING', 'MASONRY', 'PAINTING', 'PAVING', 'PEST', 'PLUMBING', 'ROOFING', 'TRASH', 'TURNOVER', 'WINDOWS']);

export const WorkOrderPrioritySchema = z.enum(['HIGH', 'LOW', 'NORMAL']);

export const WorkOrderStatusSchema = z.enum(['ASSIGNED', 'CANCELLED', 'COMPLETE', 'DEFERRED', 'IN_PROGRESS', 'UNASSIGNED']);

export function BaseMutationResponseSchema(): z.ZodObject<Properties<BaseMutationResponse>> {
  return z.object({
    code: z.string().nullish(),
    message: z.string().nullish(),
    success: z.boolean()
  })
}

export function CancelWorkOrderResponseSchema() {
  return z.union([DeleteMutationResponseSchema(), WorkOrderSchema()])
}

export function ChecklistItemSchema(): z.ZodObject<Properties<ChecklistItem>> {
  return z.object({
    __typename: z.literal('ChecklistItem').optional(),
    description: z.string(),
    id: z.string(),
    isCompleted: z.boolean()
  })
}

export function ContactSchema(): z.ZodObject<Properties<Contact>> {
  return z.object({
    __typename: z.literal('Contact').optional(),
    createdAt: z.date(),
    email: z.string(),
    handle: z.string(),
    id: z.string(),
    phone: z.string().nullish(),
    profile: ProfileSchema(),
    updatedAt: z.date()
  })
}

export function CreateChecklistItemInputSchema(): z.ZodObject<Properties<CreateChecklistItemInput>> {
  return z.object({
    description: z.string(),
    isCompleted: z.boolean().default(false).nullish()
  })
}

export function CreateWorkOrderInputSchema(): z.ZodObject<Properties<CreateWorkOrderInput>> {
  return z.object({
    assignedToUserID: z.string().nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(z.lazy(() => CreateChecklistItemInputSchema())).nullish(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    location: z.lazy(() => LocationInputSchema()),
    priority: WorkOrderPrioritySchema.default("NORMAL").nullish(),
    scheduledDateTime: z.date().nullish()
  })
}

export function DeleteMutationResponseSchema(): z.ZodObject<Properties<DeleteMutationResponse>> {
  return z.object({
    __typename: z.literal('DeleteMutationResponse').optional(),
    code: z.string().nullish(),
    id: z.string(),
    message: z.string().nullish(),
    success: z.boolean()
  })
}

export function InvoiceSchema(): z.ZodObject<Properties<Invoice>> {
  return z.object({
    __typename: z.literal('Invoice').optional(),
    amount: z.number(),
    assignedTo: UserSchema(),
    createdAt: z.date(),
    createdBy: UserSchema(),
    id: z.string(),
    status: InvoiceStatusSchema,
    stripePaymentIntentID: z.string().nullish(),
    updatedAt: z.date(),
    workOrder: WorkOrderSchema().nullish()
  })
}

export function InvoiceInputSchema(): z.ZodObject<Properties<InvoiceInput>> {
  return z.object({
    amount: z.number(),
    assignedToUserID: z.string(),
    workOrderID: z.string().nullish()
  })
}

export function LocationSchema(): z.ZodObject<Properties<Location>> {
  return z.object({
    __typename: z.literal('Location').optional(),
    city: z.string(),
    country: z.string(),
    region: z.string(),
    streetLine1: z.string(),
    streetLine2: z.string().nullish()
  })
}

export function LocationInputSchema(): z.ZodObject<Properties<LocationInput>> {
  return z.object({
    city: z.string(),
    country: z.string().nullish(),
    region: z.string(),
    streetLine1: z.string(),
    streetLine2: z.string().nullish()
  })
}

export function MutationResponseSchema(): z.ZodObject<Properties<MutationResponse>> {
  return z.object({
    __typename: z.literal('MutationResponse').optional(),
    code: z.string().nullish(),
    message: z.string().nullish(),
    success: z.boolean()
  })
}

export function MyInvoicesQueryResponseSchema(): z.ZodObject<Properties<MyInvoicesQueryResponse>> {
  return z.object({
    __typename: z.literal('MyInvoicesQueryResponse').optional(),
    assignedToUser: z.array(InvoiceSchema()),
    createdByUser: z.array(InvoiceSchema())
  })
}

export function MyWorkOrdersQueryResponseSchema(): z.ZodObject<Properties<MyWorkOrdersQueryResponse>> {
  return z.object({
    __typename: z.literal('MyWorkOrdersQueryResponse').optional(),
    assignedToUser: z.array(WorkOrderSchema()),
    createdByUser: z.array(WorkOrderSchema())
  })
}

export function ProfileSchema(): z.ZodObject<Properties<Profile>> {
  return z.object({
    __typename: z.literal('Profile').optional(),
    businessName: z.string().nullish(),
    displayName: z.string(),
    familyName: z.string().nullish(),
    givenName: z.string().nullish(),
    photoUrl: z.string().nullish()
  })
}

export function ProfileInputSchema(): z.ZodObject<Properties<ProfileInput>> {
  return z.object({
    businessName: z.string().nullish(),
    displayName: z.string().nullish(),
    familyName: z.string().nullish(),
    givenName: z.string().nullish(),
    photoUrl: z.string().url().nullish()
  })
}

export function PublicUserFieldsSchema(): z.ZodObject<Properties<PublicUserFields>> {
  return z.object({
    createdAt: z.date(),
    email: z.string(),
    handle: z.string(),
    id: z.string(),
    phone: z.string().nullish(),
    profile: ProfileSchema(),
    updatedAt: z.date()
  })
}

export function UpdateChecklistItemInputSchema(): z.ZodObject<Properties<UpdateChecklistItemInput>> {
  return z.object({
    description: z.string(),
    id: z.string().nullish(),
    isCompleted: z.boolean().default(false).nullish()
  })
}

export function UpdateWorkOrderInputSchema(): z.ZodObject<Properties<UpdateWorkOrderInput>> {
  return z.object({
    assignedToUserID: z.string().nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(z.lazy(() => UpdateChecklistItemInputSchema())).nullish(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    location: z.lazy(() => LocationInputSchema().nullish()),
    priority: WorkOrderPrioritySchema.default("NORMAL").nullish(),
    scheduledDateTime: z.date().nullish()
  })
}

export function UserSchema(): z.ZodObject<Properties<User>> {
  return z.object({
    __typename: z.literal('User').optional(),
    createdAt: z.date(),
    email: z.string(),
    handle: z.string(),
    id: z.string(),
    phone: z.string().nullish(),
    profile: ProfileSchema(),
    updatedAt: z.date()
  })
}

export function UserStripeConnectAccountSchema(): z.ZodObject<Properties<UserStripeConnectAccount>> {
  return z.object({
    __typename: z.literal('UserStripeConnectAccount').optional(),
    chargesEnabled: z.boolean(),
    createdAt: z.date(),
    detailsSubmitted: z.boolean(),
    id: z.string(),
    payoutsEnabled: z.boolean(),
    updatedAt: z.date()
  })
}

export function UserSubscriptionSchema(): z.ZodObject<Properties<UserSubscription>> {
  return z.object({
    __typename: z.literal('UserSubscription').optional(),
    createdAt: z.date(),
    currentPeriodEnd: z.date(),
    id: z.string(),
    priceID: z.string(),
    productID: z.string(),
    status: SubscriptionStatusSchema,
    updatedAt: z.date()
  })
}

export function WorkOrderSchema(): z.ZodObject<Properties<WorkOrder>> {
  return z.object({
    __typename: z.literal('WorkOrder').optional(),
    assignedTo: UserSchema().nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(ChecklistItemSchema().nullable()).nullish(),
    contractorNotes: z.string().nullish(),
    createdAt: z.date(),
    createdBy: UserSchema(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    id: z.string(),
    location: LocationSchema(),
    priority: WorkOrderPrioritySchema,
    scheduledDateTime: z.date().nullish(),
    status: WorkOrderStatusSchema,
    updatedAt: z.date()
  })
}
