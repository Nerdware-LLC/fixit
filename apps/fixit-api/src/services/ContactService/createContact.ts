import { Contact, type ContactItem } from "@fixit/dynamodb-models/Contact";
import { User } from "@fixit/dynamodb-models/User";
import { UserInputError } from "@fixit/http-errors";
import type { Contact as GqlContactObject } from "@fixit/api-schemas/GraphQL/types";

/**
 * ### ContactService: createContact
 */
export const createContact = async ({
  authenticatedUserID,
  contactUserID,
}: {
  authenticatedUserID: string;
  contactUserID: string;
}): Promise<ContactItem & GqlContactObject> => {
  // First, ensure the user hasn't somehow sent their own ID
  if (contactUserID.toUpperCase() === authenticatedUserID.toUpperCase())
    throw new UserInputError("Can not add yourself as a contact");

  const requestedContactUser = await User.getItem({ id: contactUserID });

  if (!requestedContactUser) throw new UserInputError("Requested user not found.");

  // Note: createItem won't overwrite existing if Contact already exists.
  const newContact = await Contact.createItem({
    userID: authenticatedUserID,
    contactUserID: requestedContactUser.id,
    handle: requestedContactUser.handle,
  });

  return {
    ...newContact,
    email: requestedContactUser.email,
    phone: requestedContactUser.phone,
    profile: requestedContactUser.profile,
  };
};
