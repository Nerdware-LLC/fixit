export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Custom DateTime scalar with handling for Date objects and datetime strings */
  DateTime: { input: Date; output: Date; }
  /** Custom Email scalar with regex validation */
  Email: { input: string; output: string; }
};

/** Mutation response for setting a WorkOrder's status to CANCELLED */
export type CancelWorkOrderResponse = DeleteMutationResponse | WorkOrder;

export type ChecklistItem = {
  __typename?: 'ChecklistItem';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
};

/**
 * Contact is a type which is simply a concrete implementation of the publicly
 * accessible user fields defined in the PublicUserFields interface. The Contact
 * type represents a user's contact, and is used to manage a user's contacts.
 */
export type Contact = PublicUserFields & {
  __typename?: 'Contact';
  /** (Immutable) Contact creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Contact email address */
  email: Scalars['Email']['output'];
  /** Public-facing handle identifies users to other users (e.g., '@joe') */
  handle: Scalars['String']['output'];
  /** Contact ID internally identifies a user's contact */
  id: Scalars['ID']['output'];
  /** Contact phone number */
  phone?: Maybe<Scalars['String']['output']>;
  /** Contact Profile object */
  profile: Profile;
  /** Timestamp of the most recent Contact object update */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateChecklistItemInput = {
  description: Scalars['String']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateLocationInput = {
  city: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  region: Scalars['String']['input'];
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

/** Input for creating a new WorkOrder */
export type CreateWorkOrderInput = {
  assignedTo?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<WorkOrderCategory>;
  checklist?: InputMaybe<Array<CreateChecklistItemInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  entryContact?: InputMaybe<Scalars['String']['input']>;
  entryContactPhone?: InputMaybe<Scalars['String']['input']>;
  location: CreateLocationInput;
  priority?: InputMaybe<WorkOrderPriority>;
  scheduledDateTime?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A mutation response type for delete operations. */
export type DeleteMutationResponse = MutationResponse & {
  __typename?: 'DeleteMutationResponse';
  code?: Maybe<Scalars['String']['output']>;
  /** The ID of the deleted entity. */
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** GraphQLError 'extensions.code' values for client error responses */
export type GraphQLErrorCode =
  /** The GraphQLError 'extensions.code' value for 401-status errors. */
  | 'AUTHENTICATION_REQUIRED'
  /**
   * The GraphQLError 'extensions.code' value for 400-status errors.
   * > This code is an ApolloServer builtin — see [ApolloServerErrorCode][apollo-error-codes].
   * [apollo-error-codes]: https://github.com/apollographql/apollo-server/blob/268687db591fed8293eeded1546ae2f8e6f2b6a7/packages/server/src/errors/index.ts
   */
  | 'BAD_USER_INPUT'
  /** The GraphQLError 'extensions.code' value for 403-status errors. */
  | 'FORBIDDEN'
  /**
   * The GraphQLError 'extensions.code' value for 500-status errors.
   * > This code is an ApolloServer builtin — see [ApolloServerErrorCode][apollo-error-codes].
   * [apollo-error-codes]: https://github.com/apollographql/apollo-server/blob/268687db591fed8293eeded1546ae2f8e6f2b6a7/packages/server/src/errors/index.ts
   */
  | 'INTERNAL_SERVER_ERROR'
  /** The GraphQLError 'extensions.code' value for 402-status errors. */
  | 'PAYMENT_REQUIRED'
  /** The GraphQLError 'extensions.code' value for 404-status errors. */
  | 'RESOURCE_NOT_FOUND';

/**
 * GraphQLError custom extensions for client responses.
 * See https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors
 */
export type GraphQLErrorCustomExtensions = {
  __typename?: 'GraphQLErrorCustomExtensions';
  code: GraphQLErrorCode;
  http?: Maybe<GraphQLErrorCustomHttpExtension>;
};

/**
 * GraphQLError custom 'http' extension for providing client error responses
 * with traditional HTTP error status codes ('extensions.http.status').
 */
export type GraphQLErrorCustomHttpExtension = {
  __typename?: 'GraphQLErrorCustomHttpExtension';
  /**
   * The HTTP status code for the error:
   * - 400 'Bad User Input'
   * - 401 'Authentication Required'
   * - 402 'Payment Required'
   * - 403 'Forbidden'
   * - 404 'Resource Not Found'
   * - 500 'Internal Server Error'
   */
  status: Scalars['Int']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  /** The Invoice amount, represented as an integer which reflects USD centage (i.e., an 'amount' of 1 = $0.01 USD) */
  amount: Scalars['Int']['output'];
  /** (Immutable) The User to whom the Invoice was assigned, AKA the Invoice's recipient */
  assignedTo: User;
  /** (Immutable) Invoice creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** (Immutable) The User who created/sent the Invoice */
  createdBy: User;
  /** (Immutable) Invoice ID, in the format of 'INV#{createdBy.id}#{UUID}' */
  id: Scalars['ID']['output'];
  /** The Invoice status; this field is controlled by the API and can not be directly edited by Users */
  status: InvoiceStatus;
  /** The ID of the most recent successful paymentIntent applied to the Invoice, if any */
  stripePaymentIntentID?: Maybe<Scalars['String']['output']>;
  /** Timestamp of the most recent Invoice update */
  updatedAt: Scalars['DateTime']['output'];
  /** A WorkOrder attached to the Invoice which was created by the 'assignedTo' User */
  workOrder?: Maybe<WorkOrder>;
};

export type InvoiceInput = {
  amount: Scalars['Int']['input'];
  /** The ID of the User to whom the Invoice will be assigned */
  assignedTo: Scalars['ID']['input'];
  workOrderID?: InputMaybe<Scalars['ID']['input']>;
};

export type InvoiceStatus =
  | 'CLOSED'
  | 'DISPUTED'
  | 'OPEN';

export type Location = {
  __typename?: 'Location';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  region: Scalars['String']['output'];
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelWorkOrder: CancelWorkOrderResponse;
  createContact: Contact;
  createInvite: MutationResponse;
  createInvoice: Invoice;
  createWorkOrder: WorkOrder;
  deleteContact: DeleteMutationResponse;
  deleteInvoice: DeleteMutationResponse;
  payInvoice: Invoice;
  setWorkOrderStatusComplete: WorkOrder;
  updateInvoiceAmount: Invoice;
  updateProfile: Profile;
  updateWorkOrder: WorkOrder;
};


export type MutationcancelWorkOrderArgs = {
  workOrderID: Scalars['ID']['input'];
};


export type MutationcreateContactArgs = {
  contactUserID: Scalars['ID']['input'];
};


export type MutationcreateInviteArgs = {
  phoneOrEmail: Scalars['String']['input'];
};


export type MutationcreateInvoiceArgs = {
  invoice: InvoiceInput;
};


export type MutationcreateWorkOrderArgs = {
  workOrder: CreateWorkOrderInput;
};


export type MutationdeleteContactArgs = {
  contactID: Scalars['ID']['input'];
};


export type MutationdeleteInvoiceArgs = {
  invoiceID: Scalars['ID']['input'];
};


export type MutationpayInvoiceArgs = {
  invoiceID: Scalars['ID']['input'];
};


export type MutationsetWorkOrderStatusCompleteArgs = {
  workOrderID: Scalars['ID']['input'];
};


export type MutationupdateInvoiceAmountArgs = {
  amount: Scalars['Int']['input'];
  invoiceID: Scalars['ID']['input'];
};


export type MutationupdateProfileArgs = {
  profile: ProfileInput;
};


export type MutationupdateWorkOrderArgs = {
  workOrder: UpdateWorkOrderInput;
  workOrderID: Scalars['ID']['input'];
};

/** A generic mutation response type. */
export type MutationResponse = {
  /**
   * A code for the mutation response. This may be an HTTP status code, like '200',
   * or a GraphQLError code, like 'BAD_USER_INPUT', depending on what makes sense
   * for the implementing type.
   */
  code?: Maybe<Scalars['String']['output']>;
  /** An optional message to provide additional info about the mutation response. */
  message?: Maybe<Scalars['String']['output']>;
  /** Whether the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

export type MyInvoicesQueryResponse = {
  __typename?: 'MyInvoicesQueryResponse';
  assignedToUser: Array<Invoice>;
  createdByUser: Array<Invoice>;
};

export type MyWorkOrdersQueryResponse = {
  __typename?: 'MyWorkOrdersQueryResponse';
  assignedToUser: Array<WorkOrder>;
  createdByUser: Array<WorkOrder>;
};

export type Profile = {
  __typename?: 'Profile';
  businessName?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type ProfileInput = {
  businessName?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

/** PublicUserFields is an interface which defines publicly-accessible User fields. */
export type PublicUserFields = {
  createdAt: Scalars['DateTime']['output'];
  /** User email address */
  email: Scalars['Email']['output'];
  /** Public-facing handle identifies users to other users (e.g., '@joe') */
  handle: Scalars['String']['output'];
  /** User or Contact ID */
  id: Scalars['ID']['output'];
  /** User phone number */
  phone?: Maybe<Scalars['String']['output']>;
  /** User Profile object */
  profile: Profile;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  contact: Contact;
  /**
   * This query returns the public fields of a User whose handle exactly matches the
   * provided `handle` argument. To search for one or more Users whose handle begins
   * with or fuzzy-matches a provided string, use `searchForUsersByHandle`.
   */
  getUserByHandle?: Maybe<User>;
  invoice: Invoice;
  myContacts: Array<Contact>;
  myInvoices: MyInvoicesQueryResponse;
  myProfile: Profile;
  mySubscription: UserSubscription;
  myWorkOrders: MyWorkOrdersQueryResponse;
  profile: Profile;
  /**
   * This query returns a paginated list of Users whose handle begins with the provided
   * `handle` argument, which can be incomplete but must at least contain two characters:
   * the beginning "@", and one character that's either alphanumeric or an underscore.
   *
   * Note that this query is intended to be used in conjunction with a pagination utility
   * like [Apollo's `fetchMore` function](https://www.apollographql.com/docs/react/pagination/core-api#the-fetchmore-function).
   *
   * ### ROADMAP:
   *
   * - Matching Algorithm Change: In the future, the Contact selection method used in this
   *   query will either be replaced by a fuzzy-matching system based on the Levenshtein-Demerau
   *   model, or a cloud-based search service like ElasticSearch. This change will eliminate
   *   the `offset` restrictions in regard to the value of `handle` in follow-up queries.
   * - Response Structure: The response may be converted into an object with keys `data` and
   *   `nextOffset`. The `data` key will contain the array of matching Users, and `nextOffset`
   *   will be the value of the `offset` argument to be used in a follow-up query.
   */
  searchForUsersByHandle: Array<User>;
  workOrder: WorkOrder;
};


export type QuerycontactArgs = {
  contactID: Scalars['ID']['input'];
};


export type QuerygetUserByHandleArgs = {
  handle: Scalars['String']['input'];
};


export type QueryinvoiceArgs = {
  invoiceID: Scalars['ID']['input'];
};


export type QueryprofileArgs = {
  profileID: Scalars['ID']['input'];
};


export type QuerysearchForUsersByHandleArgs = {
  handle: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryworkOrderArgs = {
  workOrderID: Scalars['ID']['input'];
};

/** Names of the currently available Fixit subscription price-models */
export type SubscriptionPriceName =
  /** The annual subscription price model */
  | 'ANNUAL'
  /** The monthly subscription price model */
  | 'MONTHLY'
  /** The trial subscription price model */
  | 'TRIAL';

/**
 * The status of a User's Subscription, as provided by Stripe.
 * See https://docs.stripe.com/api/subscriptions/object#subscription_object-status
 */
export type SubscriptionStatus =
  /** The subscription is active and the user has access to the product */
  | 'active'
  /** The subscription is canceled and the user has lost access to the product */
  | 'canceled'
  /** The subscription is incomplete and has not yet expired */
  | 'incomplete'
  /** The subscription is incomplete and has expired */
  | 'incomplete_expired'
  /** The subscription is past due and the user has lost access to the product */
  | 'past_due'
  /** The subscription is in a limited trial phase and has access to the product */
  | 'trialing'
  /** The subscription is unpaid and the user has lost access to the product */
  | 'unpaid';

export type UpdateChecklistItemInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateLocationInput = {
  city: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  region: Scalars['String']['input'];
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating an existing WorkOrder */
export type UpdateWorkOrderInput = {
  assignedToUserID?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<WorkOrderCategory>;
  checklist?: InputMaybe<Array<UpdateChecklistItemInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  entryContact?: InputMaybe<Scalars['String']['input']>;
  entryContactPhone?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<UpdateLocationInput>;
  priority?: InputMaybe<WorkOrderPriority>;
  scheduledDateTime?: InputMaybe<Scalars['DateTime']['input']>;
};

/** User is an implementation of the PublicUserFields interface which represents an individual User. */
export type User = PublicUserFields & {
  __typename?: 'User';
  /** (Immutable) Account creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** User's own email address */
  email: Scalars['Email']['output'];
  /** (Immutable) Public-facing handle identifies users to other users (e.g., '@joe') */
  handle: Scalars['String']['output'];
  /** (Immutable) User ID internally identifies individual User accounts */
  id: Scalars['ID']['output'];
  /** User's own phone number */
  phone?: Maybe<Scalars['String']['output']>;
  /** User's own Profile object */
  profile: Profile;
  /** Timestamp of the most recent account update */
  updatedAt: Scalars['DateTime']['output'];
};

/** A user's Stripe Connect Account details */
export type UserStripeConnectAccount = {
  __typename?: 'UserStripeConnectAccount';
  /** Whether the user's Stripe Connect Account is enabled for charges */
  chargesEnabled: Scalars['Boolean']['output'];
  /** (Immutable) UserStripeConnectAccount creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Whether the user has submitted all required details to set up their Stripe Connect Account */
  detailsSubmitted: Scalars['Boolean']['output'];
  /** (Immutable) The UserStripeConnectAccount's unique ID */
  id: Scalars['ID']['output'];
  /** Whether the user's Stripe Connect Account is enabled for payouts */
  payoutsEnabled: Scalars['Boolean']['output'];
  /** Timestamp of the most recent UserStripeConnectAccount update */
  updatedAt: Scalars['DateTime']['output'];
};

/** A user's subscription to a Fixit SaaS product */
export type UserSubscription = {
  __typename?: 'UserSubscription';
  /** (Immutable) UserSubscription creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** The timestamp indicating when the current UserSubscription period ends */
  currentPeriodEnd: Scalars['DateTime']['output'];
  /** (Immutable) The UserSubscription's unique ID */
  id: Scalars['ID']['output'];
  /** The UserSubscription's price ID, as provided by Stripe */
  priceID: Scalars['String']['output'];
  /** The UserSubscription's product ID, as provided by Stripe */
  productID: Scalars['String']['output'];
  /** The UserSubscription's status, as provided by Stripe */
  status: SubscriptionStatus;
  /** Timestamp of the most recent UserSubscription update */
  updatedAt: Scalars['DateTime']['output'];
};

/** A WorkOrder is a request one User submits to another for work to be performed at a location */
export type WorkOrder = {
  __typename?: 'WorkOrder';
  /** The User to whom the WorkOrder was assigned, AKA the WorkOrder's recipient */
  assignedTo?: Maybe<User>;
  /** The category of work to be performed as part of the WorkOrder */
  category?: Maybe<WorkOrderCategory>;
  /** The WorkOrder checklist, an array of ChecklistItem objects */
  checklist?: Maybe<Array<Maybe<ChecklistItem>>>;
  /** Notes from the WorkOrder's recipient (this field will be renamed in the future) */
  contractorNotes?: Maybe<Scalars['String']['output']>;
  /** (Immutable) WorkOrder creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** (Immutable) The User who created/sent the WorkOrder */
  createdBy: User;
  /** A general description of the work to be performed as part of the WorkOrder */
  description?: Maybe<Scalars['String']['output']>;
  /** Timestamp of the WorkOrder's due date */
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the WorkOrder's entry contact, if any */
  entryContact?: Maybe<Scalars['String']['output']>;
  /** The phone number of the WorkOrder's entry contact, if any */
  entryContactPhone?: Maybe<Scalars['String']['output']>;
  /** (Immutable) WorkOrder ID, in the format of 'WO#{createdBy.id}#{UUID}' */
  id: Scalars['ID']['output'];
  /** The location of the job site for the WorkOrder */
  location: Location;
  /** The WorkOrder priority */
  priority: WorkOrderPriority;
  /** Timestamp of the WorkOrder's scheduled completion */
  scheduledDateTime?: Maybe<Scalars['DateTime']['output']>;
  /** The WorkOrder status */
  status: WorkOrderStatus;
  /** Timestamp of the most recent WorkOrder update */
  updatedAt: Scalars['DateTime']['output'];
};

/** The category of work to be performed as part of a WorkOrder */
export type WorkOrderCategory =
  /** The WorkOrder involves drywall */
  | 'DRYWALL'
  /** The WorkOrder involves electrical */
  | 'ELECTRICAL'
  /** The WorkOrder involves flooring */
  | 'FLOORING'
  /** The WorkOrder involves general maintenance */
  | 'GENERAL'
  /** The WorkOrder involves HVAC */
  | 'HVAC'
  /** The WorkOrder involves landscaping */
  | 'LANDSCAPING'
  /** The WorkOrder involves masonry */
  | 'MASONRY'
  /** The WorkOrder involves painting */
  | 'PAINTING'
  /** The WorkOrder involves paving */
  | 'PAVING'
  /** The WorkOrder involves pest control */
  | 'PEST'
  /** The WorkOrder involves plumbing */
  | 'PLUMBING'
  /** The WorkOrder involves roofing */
  | 'ROOFING'
  /** The WorkOrder involves trash removal */
  | 'TRASH'
  /** The WorkOrder involves turnover, i.e., general 'make-ready' tasks for a new tenant or owner */
  | 'TURNOVER'
  /** The WorkOrder involves windows */
  | 'WINDOWS';

/** The general priority of a WorkOrder */
export type WorkOrderPriority =
  /** The WorkOrder is of high priority */
  | 'HIGH'
  /** The WorkOrder is of low priority */
  | 'LOW'
  /** The WorkOrder is of normal priority */
  | 'NORMAL';

/** The current status of a WorkOrder */
export type WorkOrderStatus =
  /** The WorkOrder has been assigned to a recipient but has not yet been started */
  | 'ASSIGNED'
  /** The WorkOrder has been cancelled */
  | 'CANCELLED'
  /** The WorkOrder has been completed */
  | 'COMPLETE'
  /** The WorkOrder has been deferred to a later date */
  | 'DEFERRED'
  /** The WorkOrder is in progress */
  | 'IN_PROGRESS'
  /** The WorkOrder has not yet been assigned to a recipient */
  | 'UNASSIGNED';
