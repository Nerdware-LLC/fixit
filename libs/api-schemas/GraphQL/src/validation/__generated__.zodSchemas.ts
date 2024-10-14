// @ts-nocheck
import { z } from 'zod'
import type { WorkOrderStatus, UserSubscription, UserStripeConnectAccount, UpdateChecklistItemInput, SupportedConstraintFormat, SubscriptionStatus, SubscriptionPriceName, User, ProfileInput, Profile, MyWorkOrdersQueryResponse, MyInvoicesQueryResponse, MutationResponse, LocationInput, Location, InvoiceStatus, InvoiceInput, WorkOrderPriority, WorkOrderCategory, WorkOrder, Invoice, UpdateWorkOrderInput, CreateWorkOrderInput, CreateChecklistItemInput, Contact, ChecklistItem, DeleteMutationResponse, BaseMutationResponse, PublicUserFields } from '@fixit/api-schemas/GraphQL/types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const WorkOrderStatusSchema = z.enum(['ASSIGNED', 'CANCELLED', 'COMPLETE', 'DEFERRED', 'IN_PROGRESS', 'UNASSIGNED']);

export const SupportedConstraintFormatSchema = z.enum(['email', 'handle', 'phone', 'url', 'uuid']);

export const SubscriptionStatusSchema = z.enum(['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid']);

export const SubscriptionPriceNameSchema = z.enum(['ANNUAL', 'MONTHLY', 'TRIAL']);

export const InvoiceStatusSchema = z.enum(['CLOSED', 'DISPUTED', 'OPEN']);

export const WorkOrderPrioritySchema = z.enum(['HIGH', 'LOW', 'NORMAL']);

export const WorkOrderCategorySchema = z.enum(['DRYWALL', 'ELECTRICAL', 'FLOORING', 'GENERAL', 'HVAC', 'LANDSCAPING', 'MASONRY', 'PAINTING', 'PAVING', 'PEST', 'PLUMBING', 'ROOFING', 'TRASH', 'TURNOVER', 'WINDOWS']);

export const UserSubscriptionSchema: z.ZodObject<Properties<UserSubscription>> = z.object({
    __typename: z.literal('UserSubscription').optional(),
    createdAt: z.date(),
    currentPeriodEnd: z.date(),
    id: z.string(),
    priceID: z.string(),
    productID: z.string(),
    status: SubscriptionStatusSchema,
    updatedAt: z.date()
});

export const UserStripeConnectAccountSchema: z.ZodObject<Properties<UserStripeConnectAccount>> = z.object({
    __typename: z.literal('UserStripeConnectAccount').optional(),
    chargesEnabled: z.boolean(),
    createdAt: z.date(),
    detailsSubmitted: z.boolean(),
    id: z.string(),
    payoutsEnabled: z.boolean(),
    updatedAt: z.date()
});

export const UpdateChecklistItemInputSchema: z.ZodObject<Properties<UpdateChecklistItemInput>> = z.object({
    description: z.string(),
    id: z.string().nullish(),
    isCompleted: z.boolean().default(false).nullish()
});

export const UserSchema: z.ZodObject<Properties<User>> = z.object({
    __typename: z.literal('User').optional(),
    createdAt: z.date(),
    email: z.string(),
    handle: z.string(),
    id: z.string(),
    phone: z.string().nullish(),
    profile: ProfileSchema,
    updatedAt: z.date()
});

export const ProfileInputSchema: z.ZodObject<Properties<ProfileInput>> = z.object({
    businessName: z.string().nullish(),
    displayName: z.string().nullish(),
    familyName: z.string().nullish(),
    givenName: z.string().nullish(),
    photoUrl: z.string().url().nullish()
});

export const ProfileSchema: z.ZodObject<Properties<Profile>> = z.object({
    __typename: z.literal('Profile').optional(),
    businessName: z.string().nullish(),
    displayName: z.string(),
    familyName: z.string().nullish(),
    givenName: z.string().nullish(),
    photoUrl: z.string().nullish()
});

export const MyWorkOrdersQueryResponseSchema: z.ZodObject<Properties<MyWorkOrdersQueryResponse>> = z.object({
    __typename: z.literal('MyWorkOrdersQueryResponse').optional(),
    assignedToUser: z.array(WorkOrderSchema),
    createdByUser: z.array(WorkOrderSchema)
});

export const MyInvoicesQueryResponseSchema: z.ZodObject<Properties<MyInvoicesQueryResponse>> = z.object({
    __typename: z.literal('MyInvoicesQueryResponse').optional(),
    assignedToUser: z.array(InvoiceSchema),
    createdByUser: z.array(InvoiceSchema)
});

export const MutationResponseSchema: z.ZodObject<Properties<MutationResponse>> = z.object({
    __typename: z.literal('MutationResponse').optional(),
    code: z.string().nullish(),
    message: z.string().nullish(),
    success: z.boolean()
});

export const LocationInputSchema: z.ZodObject<Properties<LocationInput>> = z.object({
    city: z.string(),
    country: z.string().nullish(),
    region: z.string(),
    streetLine1: z.string(),
    streetLine2: z.string().nullish()
});

export const LocationSchema: z.ZodObject<Properties<Location>> = z.object({
    __typename: z.literal('Location').optional(),
    city: z.string(),
    country: z.string(),
    region: z.string(),
    streetLine1: z.string(),
    streetLine2: z.string().nullish()
});

export const InvoiceInputSchema: z.ZodObject<Properties<InvoiceInput>> = z.object({
    amount: z.number(),
    assignedToUserID: z.string(),
    workOrderID: z.string().nullish()
});

export const WorkOrderSchema: z.ZodObject<Properties<WorkOrder>> = z.object({
    __typename: z.literal('WorkOrder').optional(),
    assignedTo: UserSchema.nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(ChecklistItemSchema.nullable()).nullish(),
    contractorNotes: z.string().nullish(),
    createdAt: z.date(),
    createdBy: UserSchema,
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    id: z.string(),
    location: LocationSchema,
    priority: WorkOrderPrioritySchema,
    scheduledDateTime: z.date().nullish(),
    status: WorkOrderStatusSchema,
    updatedAt: z.date()
});

export const InvoiceSchema: z.ZodObject<Properties<Invoice>> = z.object({
    __typename: z.literal('Invoice').optional(),
    amount: z.number(),
    assignedTo: UserSchema,
    createdAt: z.date(),
    createdBy: UserSchema,
    id: z.string(),
    status: InvoiceStatusSchema,
    stripePaymentIntentID: z.string().nullish(),
    updatedAt: z.date(),
    workOrder: WorkOrderSchema.nullish()
});

export const UpdateWorkOrderInputSchema: z.ZodObject<Properties<UpdateWorkOrderInput>> = z.object({
    assignedToUserID: z.string().nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(z.lazy(() => UpdateChecklistItemInputSchema)).nullish(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    location: z.lazy(() => LocationInputSchema.nullish()),
    priority: WorkOrderPrioritySchema.default("NORMAL").nullish(),
    scheduledDateTime: z.date().nullish()
});

export const CreateWorkOrderInputSchema: z.ZodObject<Properties<CreateWorkOrderInput>> = z.object({
    assignedToUserID: z.string().nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(z.lazy(() => CreateChecklistItemInputSchema)).nullish(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    location: z.lazy(() => LocationInputSchema),
    priority: WorkOrderPrioritySchema.default("NORMAL").nullish(),
    scheduledDateTime: z.date().nullish()
});

export const CreateChecklistItemInputSchema: z.ZodObject<Properties<CreateChecklistItemInput>> = z.object({
    description: z.string(),
    isCompleted: z.boolean().default(false).nullish()
});

export const ContactSchema: z.ZodObject<Properties<Contact>> = z.object({
    __typename: z.literal('Contact').optional(),
    createdAt: z.date(),
    email: z.string(),
    handle: z.string(),
    id: z.string(),
    phone: z.string().nullish(),
    profile: ProfileSchema,
    updatedAt: z.date()
});

export const ChecklistItemSchema: z.ZodObject<Properties<ChecklistItem>> = z.object({
    __typename: z.literal('ChecklistItem').optional(),
    description: z.string(),
    id: z.string(),
    isCompleted: z.boolean()
});

export const DeleteMutationResponseSchema: z.ZodObject<Properties<DeleteMutationResponse>> = z.object({
    __typename: z.literal('DeleteMutationResponse').optional(),
    code: z.string().nullish(),
    id: z.string(),
    message: z.string().nullish(),
    success: z.boolean()
});

export const CancelWorkOrderResponseSchema = z.union([DeleteMutationResponseSchema, WorkOrderSchema]);

export const BaseMutationResponseSchema: z.ZodObject<Properties<BaseMutationResponse>> = z.object({
    code: z.string().nullish(),
    message: z.string().nullish(),
    success: z.boolean()
});

export const PublicUserFieldsSchema: z.ZodObject<Properties<PublicUserFields>> = z.object({
    createdAt: z.date(),
    email: z.string(),
    handle: z.string(),
    id: z.string(),
    phone: z.string().nullish(),
    profile: ProfileSchema,
    updatedAt: z.date()
});
