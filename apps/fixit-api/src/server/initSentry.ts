import * as Sentry from "@sentry/node";
import { ENV } from "@/server/env.js";

if (ENV.SENTRY_DSN) {
  Sentry.init({
    enabled: true,
    dsn: ENV.SENTRY_DSN,
    environment: ENV.NODE_ENV,
    tracesSampleRate: 1.0,
    ...(ENV.PROJECT_VERSION && {
      release: ENV.PROJECT_VERSION,
    }),
  });
} else if (ENV.IS_DEPLOYED_ENV) {
  throw new Error("Unable to initialize Sentry in deployed env: Missing SENTRY_DSN");
}
