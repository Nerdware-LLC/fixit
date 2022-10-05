/* eslint-disable node/no-process-env */
const {
  NODE_ENV,
  npm_package_version,
  SELF_URI,
  PORT,
  AWS_REGION,
  DYNAMODB_TABLE_NAME,
  DYNAMODB_LOCAL_ENDPOINT_URL,
  JWT_PRIVATE_KEY,
  SENTRY_DSN,
  STRIPE_API_VERSION,
  STRIPE_WEBHOOKS_SECRET,
  STRIPE_WEBHOOK_SECRETS_BUCKET,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_CONNECT_ONBOARDING_REDIRECT_ROUTE,
  STRIPE_CUSTOMER_PORTAL_REDIRECT_ROUTE,
  FIXIT_SUB_PRODUCT_ID,
  FIXIT_SUB_PRICE_ID_MONTHLY,
  FIXIT_SUB_PRICE_ID_ANNUAL,
  STRIPE_VIP_PROMO_CODE,
  STRIPE_VIP_PROMO_CODE_ID
} = process.env;

export const ENV = Object.freeze({
  NODE_ENV,
  IS_PROD: NODE_ENV === "production",
  CONFIG: {
    PROJECT_VERSION: npm_package_version,
    // prettier-ignore
    TIMEZONE: `${new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)?.[1] ?? "FAILED_TO_OBTAIN_TIMEZONE"}`,
    SELF_URI,
    PORT,
    OS_PLATFORM: process.platform,
    PID: process.pid,
    NODE_VERSION: process.version,
    CWD: process.cwd()
  },
  AWS: {
    REGION: AWS_REGION,
    DYNAMODB_TABLE_NAME,
    DYNAMODB_LOCAL_ENDPOINT_URL
  },
  SECURITY: {
    JWT_PRIVATE_KEY
  },
  SENTRY_DSN,
  STRIPE: {
    API_VERSION: STRIPE_API_VERSION,
    // WEBHOOKS SECRETS
    WEBHOOKS_SECRET: STRIPE_WEBHOOKS_SECRET, //               <-- for dev and test envs
    WEBHOOK_SECRETS_BUCKET: STRIPE_WEBHOOK_SECRETS_BUCKET, // <-- for staging and prod envs
    // STRIPE KEYS
    PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY,
    SECRET_KEY: STRIPE_SECRET_KEY,
    // STRIPE ROUTES
    CONNECT_ONBOARDING_REDIRECT_ROUTE: STRIPE_CONNECT_ONBOARDING_REDIRECT_ROUTE,
    CUSTOMER_PORTAL_REDIRECT_ROUTE: STRIPE_CUSTOMER_PORTAL_REDIRECT_ROUTE,
    BILLING: {
      FIXIT_SUBSCRIPTION: {
        productID: FIXIT_SUB_PRODUCT_ID,
        priceIDs: {
          TRIAL: FIXIT_SUB_PRICE_ID_MONTHLY,
          MONTHLY: FIXIT_SUB_PRICE_ID_ANNUAL,
          ANNUAL: FIXIT_SUB_PRICE_ID_ANNUAL
        },
        promoCodes: {
          [STRIPE_VIP_PROMO_CODE]: STRIPE_VIP_PROMO_CODE_ID
        }
      }
    }
  }
});
