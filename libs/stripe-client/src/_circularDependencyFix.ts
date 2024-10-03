/**
 * This file is a workaround for a circular dependency issues.
 *
 * // TODO Re-organize code to remove circular dependency.
 */

/**
 * ### DUPLICATE EXPORT — This export is a duplicate that resolves a circular dependency issue.
 *
 * The original is defined in `libs/api-schemas/GraphQL/`.
 */
export type SubscriptionPriceName = (typeof FIXIT_SUB_PRICE_NAMES)[number];

/**
 * ### DUPLICATE EXPORT — This export is a duplicate that resolves a circular dependency issue.
 *
 * The original is defined in `libs/dynamodb-models/src/UserSubscription/enumConstants.ts`.
 */
export type SubscriptionProductName = typeof FIXIT_SUB_PRODUCT_NAME;

/**
 * ### DUPLICATE EXPORT — This export is a duplicate that resolves a circular dependency issue.
 *
 * The original is defined in `libs/dynamodb-models/src/UserSubscription/enumConstants.ts`.
 */
export const FIXIT_SUB_PRODUCT_NAME = "Fixit Subscription";

/**
 * ### DUPLICATE EXPORT — This export is a duplicate that resolves a circular dependency issue.
 *
 * The original is defined in `libs/dynamodb-models/src/UserSubscription/enumConstants.ts`.
 */
export const FIXIT_SUB_PRICE_NAMES = ["ANNUAL", "MONTHLY", "TRIAL"] as const;
