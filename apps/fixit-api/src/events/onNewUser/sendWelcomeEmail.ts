import { pinpointClient } from "@/lib/pinpointClient/index.js";
import type { UserItem } from "@fixit/dynamodb-models/User";

/**
 * Send welcome email to new User when `NewUser` event is emitted.
 * @event NewUser
 * @param newUser - The new User
 */
export const sendWelcomeEmail = async (newUser?: UserItem) => {
  if (!newUser) return;

  await pinpointClient.sendMessages({
    to: newUser.email,
    ChannelType: "EMAIL",
    TemplateConfiguration: {
      EmailTemplate: {
        Name: "new-user-welcome-email",
      },
    },
    MessageConfiguration: {
      EmailMessage: {
        Substitutions: {
          recipientDisplayName: [newUser.profile.displayName],
        },
      },
    },
  });
};
