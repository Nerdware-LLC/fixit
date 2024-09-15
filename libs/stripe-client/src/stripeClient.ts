import Stripe, { type Stripe as StripeTypeNamespace } from "stripe";

// eslint-disable-next-line n/no-process-env
const { PROJECT_VERSION, STRIPE_API_VERSION, STRIPE_SECRET_KEY } = process.env;

if (!STRIPE_SECRET_KEY) throw new Error("Unable to initialize Stripe client");

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION as StripeTypeNamespace.StripeConfig["apiVersion"],
  typescript: true,
  appInfo: {
    name: "fixit",
    ...(!!PROJECT_VERSION && { version: PROJECT_VERSION }),
  },
});
