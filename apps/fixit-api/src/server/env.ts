import type { ProcessEnvCustomFields } from "@/types/globals.js";
import type { Except } from "type-fest";

const {
  npm_package_version,
  NODE_ENV,
  // SERVER
  PROTOCOL,
  DOMAIN,
  PORT,
  // WEB CLIENT
  WEB_CLIENT_URL,
  // AWS
  AWS_REGION,
  DYNAMODB_REGION,
  DYNAMODB_TABLE_NAME,
  DYNAMODB_ENDPOINT,
  PINPOINT_PROJECT_ID,
  SES_EMAIL_ADDRESS,
  // AUTH
  JWT_PRIVATE_KEY,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS,
  UUID_NAMESPACE,
  // SENTRY
  SENTRY_DSN,
  // STRIPE
  STRIPE_API_VERSION,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOKS_SECRET,
  // GOOGLE
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} = process.env; // eslint-disable-line n/no-process-env

// Ensure necessary env vars have been provided
if (
  !NODE_ENV ||
  !PROTOCOL ||
  !DOMAIN ||
  !PORT ||
  !WEB_CLIENT_URL ||
  !AWS_REGION ||
  !DYNAMODB_TABLE_NAME ||
  !PINPOINT_PROJECT_ID ||
  !SES_EMAIL_ADDRESS ||
  !JWT_PRIVATE_KEY ||
  !JWT_ALGORITHM ||
  !JWT_ISSUER ||
  !JWT_EXPIRES_IN ||
  !BCRYPT_SALT_ROUNDS ||
  !UUID_NAMESPACE ||
  !STRIPE_API_VERSION ||
  !STRIPE_PUBLISHABLE_KEY ||
  !STRIPE_SECRET_KEY ||
  !STRIPE_WEBHOOKS_SECRET ||
  !GOOGLE_OAUTH_CLIENT_ID ||
  !GOOGLE_OAUTH_CLIENT_SECRET
) {
  throw new Error("Missing required environment variables");
}

export const ENV = {
  NODE_ENV,
  IS_DEV: NODE_ENV === "development",
  IS_PROD: NODE_ENV === "production",
  IS_DEPLOYED_ENV: /^(production|staging)$/.test(NODE_ENV),
  ...(!!npm_package_version && { PROJECT_VERSION: `v${npm_package_version}` }),
  PROTOCOL,
  DOMAIN,
  PORT: Number(PORT),
  API_BASE_URL: `${PROTOCOL}://${DOMAIN}`,
  API_FULL_URL: `${PROTOCOL}://${DOMAIN}:${PORT}/api`,
  // WEB CLIENT
  WEB_CLIENT_URL,
  // AWS
  AWS_REGION,
  DYNAMODB_REGION: DYNAMODB_REGION ?? AWS_REGION,
  DYNAMODB_TABLE_NAME,
  DYNAMODB_ENDPOINT,
  PINPOINT_PROJECT_ID,
  SES_EMAIL_ADDRESS,
  // AUTH
  JWT_PRIVATE_KEY,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS: Number(BCRYPT_SALT_ROUNDS),
  UUID_NAMESPACE,
  // SENTRY
  SENTRY_DSN,
  // STRIPE
  STRIPE_API_VERSION,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOKS_SECRET,
  // GOOGLE
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} as const satisfies EnvObject;

/**
 * The {@link ENV} object contains all environment variables used by the app, as well as
 * values derived from env vars (e.g., `API_BASE_URL` combines `PROTOCOL` and `DOMAIN`).
 */
export type EnvObject = Readonly<
  Except<ProcessEnvCustomFields, "npm_package_version"> & {
    IS_DEV: boolean;
    IS_PROD: boolean;
    IS_DEPLOYED_ENV: boolean;
    PROJECT_VERSION?: string; // Optional
    API_BASE_URL: string;
    API_FULL_URL: string;
  }
>;
