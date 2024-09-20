import { isString } from "@nerdware/ts-type-safety-utils";
import { SUBSCRIPTION_PRODUCT_NAMES } from "@fixit/dynamodb-models/UserSubscription";
import { intToCurrencyStr, capitalize } from "@fixit/string-formatters";
import { pinpointClient } from "@/lib/pinpointClient/index.js";
import type { SubscriptionPriceName } from "@fixit/api-schemas/GraphQL/types";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";

export type CheckoutConfirmationData = {
  user: AuthTokenPayload;
  priceName: SubscriptionPriceName;
  paymentIntentID: string | null | undefined;
  amountPaid: string | number;
};

/**
 * Send confirmation email to User when `CheckoutCompleted` event is emitted.
 * @event CheckoutCompleted
 */
export const sendConfirmationEmail = async ({
  user,
  priceName,
  paymentIntentID,
  amountPaid,
}: CheckoutConfirmationData) => {
  if (!isString(amountPaid)) amountPaid = intToCurrencyStr(amountPaid);

  await pinpointClient.sendMessages({
    to: user.email,
    ChannelType: "EMAIL",
    TemplateConfiguration: {
      EmailTemplate: {
        Name: "checkout-confirmation-email",
      },
    },
    MessageConfiguration: {
      EmailMessage: {
        Substitutions: {
          productName: [
            `${SUBSCRIPTION_PRODUCT_NAMES.FIXIT_SUBSCRIPTION} (${capitalize(priceName)})`,
          ],
          paymentIntentID: [paymentIntentID ?? "N/A"],
          amountPaid: [amountPaid],
        },
      },
    },
  });
};
