import type { Algorithm } from "jsonwebtoken";
import type { Stripe } from "stripe";
import type { OmitIndexSignature, OverrideProperties } from "type-fest";

declare global {
  namespace NodeJS {
    /**
     * This declaration adds custom fields to the `process.env` object type.
     */
    interface ProcessEnv {
      readonly NODE_ENV?: "development" | "test" | "staging" | "production" | undefined;
      readonly npm_package_version?: string | undefined;
      // SERVER
      readonly PROTOCOL?: string | undefined;
      readonly DOMAIN?: string | undefined;
      readonly PORT?: string | undefined;
      // WEB CLIENT
      readonly WEB_CLIENT_URL?: string | undefined;
      // AWS
      readonly AWS_REGION?: string | undefined;
      readonly DYNAMODB_REGION?: string | undefined;
      readonly DYNAMODB_TABLE_NAME?: string | undefined;
      readonly DYNAMODB_ENDPOINT?: string | undefined;
      readonly PINPOINT_PROJECT_ID?: string | undefined;
      readonly SES_EMAIL_ADDRESS?: string | undefined;
      // AUTH
      readonly JWT_PRIVATE_KEY?: string | undefined;
      readonly JWT_ALGORITHM?: Algorithm | undefined;
      readonly JWT_ISSUER?: string | undefined;
      readonly JWT_EXPIRES_IN?: string | undefined;
      readonly BCRYPT_SALT_ROUNDS?: string | undefined;
      readonly UUID_NAMESPACE?: string | undefined;
      // SENTRY
      readonly SENTRY_DSN?: string | undefined;
      // STRIPE
      readonly STRIPE_API_VERSION?: Stripe.StripeConfig["apiVersion"] | undefined;
      readonly STRIPE_PUBLISHABLE_KEY?: string | undefined;
      readonly STRIPE_SECRET_KEY?: string | undefined;
      readonly STRIPE_WEBHOOKS_SECRET?: string | undefined;
      // GOOGLE
      readonly GOOGLE_OAUTH_CLIENT_ID?: string | undefined;
      readonly GOOGLE_OAUTH_CLIENT_SECRET?: string | undefined;
    }
  }
}

/**
 * Union of field-names added to the {@link NodeJS.ProcessEnv|process.env} typing.
 */
export type ProcessEnvCustomFieldNames = keyof Omit<OmitIndexSignature<NodeJS.ProcessEnv>, "TZ">;

/**
 * Dict of custom fields added to the {@link NodeJS.ProcessEnv|process.env} typing.
 */
export type ProcessEnvCustomFields = OverrideProperties<
  {
    readonly [Key in ProcessEnvCustomFieldNames]-?: NonNullable<NodeJS.ProcessEnv[Key]>;
  },
  {
    readonly PORT: number;
    readonly BCRYPT_SALT_ROUNDS: number;
    readonly SENTRY_DSN: string | undefined;
    readonly DYNAMODB_ENDPOINT: string | undefined;
  }
>;
