import { z } from 'zod'
import type { WorkOrderStatus, UserSubscription, UserStripeConnectAccount, UpdateLocationInput, UpdateChecklistItemInput, SupportedConstraintFormat, SubscriptionStatus, SubscriptionPriceName, User, ProfileInput, Profile, MyWorkOrdersQueryResponse, MyInvoicesQueryResponse, MutationResponse, Location, InvoiceStatus, InvoiceInput, WorkOrderPriority, WorkOrderCategory, WorkOrder, Invoice, UpdateWorkOrderInput, CreateWorkOrderInput, CreateLocationInput, CreateChecklistItemInput, Contact, ChecklistItem, DeleteMutationResponse, BaseMutationResponse, PublicUserFields } from '@fixit/api-schemas/GraphQL/types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const WorkOrderStatusSchema = z.enum(['ASSIGNED', 'CANCELLED', 'COMPLETE', 'DEFERRED', 'IN_PROGRESS', 'UNASSIGNED']);

export const SupportedConstraintFormatSchema = z.enum(['contactID', 'email', 'handle', 'invoiceID', 'phone', 'url', 'userID', 'uuid', 'workOrderID']);

export const SubscriptionStatusSchema = z.enum(['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid']);

export const SubscriptionPriceNameSchema = z.enum(['ANNUAL', 'MONTHLY', 'TRIAL']);

export const InvoiceStatusSchema = z.enum(['CLOSED', 'DISPUTED', 'OPEN']);

export const WorkOrderPrioritySchema = z.enum(['HIGH', 'LOW', 'NORMAL']);

export const WorkOrderCategorySchema = z.enum(['DRYWALL', 'ELECTRICAL', 'FLOORING', 'GENERAL', 'HVAC', 'LANDSCAPING', 'MASONRY', 'PAINTING', 'PAVING', 'PEST', 'PLUMBING', 'ROOFING', 'TRASH', 'TURNOVER', 'WINDOWS']);

export const UserSubscriptionSchema: z.ZodObject<Properties<UserSubscription>> = z.object({
    __typename: z.literal('UserSubscription').optional(),
    createdAt: z.date(),
    currentPeriodEnd: z.date(),
    id: z.string().min(1).min(1),
    priceID: z.string().min(1),
    productID: z.string().min(1),
    status: SubscriptionStatusSchema,
    updatedAt: z.date()
});

export const UserStripeConnectAccountSchema: z.ZodObject<Properties<UserStripeConnectAccount>> = z.object({
    __typename: z.literal('UserStripeConnectAccount').optional(),
    chargesEnabled: z.boolean(),
    createdAt: z.date(),
    detailsSubmitted: z.boolean(),
    id: z.string().min(1).min(1),
    payoutsEnabled: z.boolean(),
    updatedAt: z.date()
});

export const UpdateLocationInputSchema: z.ZodObject<Properties<UpdateLocationInput>> = z.object({
    city: z.string().min(1),
    country: z.string().nullish(),
    region: z.string().min(1),
    streetLine1: z.string().min(1),
    streetLine2: z.string().nullish()
});

export const UpdateChecklistItemInputSchema: z.ZodObject<Properties<UpdateChecklistItemInput>> = z.object({
    description: z.string().min(1),
    id: z.string().min(1).nullish(),
    isCompleted: z.boolean().nullish()
});

export const UserSchema: z.ZodObject<Properties<User>> = z.object({
    __typename: z.literal('User').optional(),
    createdAt: z.date(),
    email: z.string().min(1),
    handle: z.string().min(1),
    id: z.string().min(1).min(1),
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
    displayName: z.string().min(1),
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

export const LocationSchema: z.ZodObject<Properties<Location>> = z.object({
    __typename: z.literal('Location').optional(),
    city: z.string().min(1),
    country: z.string().min(1),
    region: z.string().min(1),
    streetLine1: z.string().min(1),
    streetLine2: z.string().nullish()
});

export const InvoiceInputSchema: z.ZodObject<Properties<InvoiceInput>> = z.object({
    amount: z.number(),
    assignedTo: z.string().min(1).regex(/^USER#@[a-zA-Z0-9_]{3,50}$/, "Invalid User ID").min(1),
    workOrderID: z.string().min(1).regex(/^WO#USER#@[a-zA-Z0-9_]{3,50}#(?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, "Invalid WorkOrder ID").nullish()
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
    id: z.string().min(1).min(1),
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
    id: z.string().min(1).min(1),
    status: InvoiceStatusSchema,
    stripePaymentIntentID: z.string().nullish(),
    updatedAt: z.date(),
    workOrder: WorkOrderSchema.nullish()
});

export const UpdateWorkOrderInputSchema: z.ZodObject<Properties<UpdateWorkOrderInput>> = z.object({
    assignedToUserID: z.string().min(1).regex(/^USER#@[a-zA-Z0-9_]{3,50}$/, "Invalid User ID").nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(z.lazy(() => UpdateChecklistItemInputSchema)).nullish(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    location: z.lazy(() => UpdateLocationInputSchema.nullish()),
    priority: WorkOrderPrioritySchema.nullish(),
    scheduledDateTime: z.date().nullish()
});

export const CreateWorkOrderInputSchema: z.ZodObject<Properties<CreateWorkOrderInput>> = z.object({
    assignedTo: z.string().min(1).regex(/^USER#@[a-zA-Z0-9_]{3,50}$/, "Invalid User ID").nullish(),
    category: WorkOrderCategorySchema.nullish(),
    checklist: z.array(z.lazy(() => CreateChecklistItemInputSchema)).nullish(),
    description: z.string().nullish(),
    dueDate: z.date().nullish(),
    entryContact: z.string().nullish(),
    entryContactPhone: z.string().nullish(),
    location: z.lazy(() => CreateLocationInputSchema),
    priority: WorkOrderPrioritySchema.nullish(),
    scheduledDateTime: z.date().nullish()
});

export const CreateLocationInputSchema: z.ZodObject<Properties<CreateLocationInput>> = z.object({
    city: z.string().min(1),
    country: z.string().nullish(),
    region: z.string().min(1),
    streetLine1: z.string().min(1),
    streetLine2: z.string().nullish()
});

export const CreateChecklistItemInputSchema: z.ZodObject<Properties<CreateChecklistItemInput>> = z.object({
    description: z.string().min(1),
    isCompleted: z.boolean().nullish()
});

export const ContactSchema: z.ZodObject<Properties<Contact>> = z.object({
    __typename: z.literal('Contact').optional(),
    createdAt: z.date(),
    email: z.string().min(1),
    handle: z.string().min(1),
    id: z.string().min(1).min(1),
    phone: z.string().nullish(),
    profile: ProfileSchema,
    updatedAt: z.date()
});

export const ChecklistItemSchema: z.ZodObject<Properties<ChecklistItem>> = z.object({
    __typename: z.literal('ChecklistItem').optional(),
    description: z.string().min(1),
    id: z.string().min(1).min(1),
    isCompleted: z.boolean()
});

export const DeleteMutationResponseSchema: z.ZodObject<Properties<DeleteMutationResponse>> = z.object({
    __typename: z.literal('DeleteMutationResponse').optional(),
    code: z.string().nullish(),
    id: z.string().min(1).min(1),
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
    email: z.string().min(1),
    handle: z.string().min(1),
    id: z.string().min(1).min(1),
    phone: z.string().nullish(),
    profile: ProfileSchema,
    updatedAt: z.date()
});
