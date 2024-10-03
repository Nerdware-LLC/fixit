import { DeleteMutationResponse } from "@fixit/api-schemas/GraphQL/responses";
import { Contact, contactModelHelpers } from "@fixit/dynamodb-models/Contact";
import { userModelHelpers } from "@fixit/dynamodb-models/User";
import { ContactService } from "@/services/ContactService/index.js";
import { UserService } from "@/services/UserService/index.js";
import type { Resolvers } from "@fixit/api-schemas/GraphQL/types";

export const resolvers: Resolvers = {
  Query: {
    contact: async (_parent, { contactID }, { user }) => {
      // Sanitize contactID
      contactID = contactModelHelpers.id.sanitizeAndValidate(contactID);

      return await ContactService.findContactByID({
        authenticatedUserID: user.id,
        contactID,
      });
    },
    myContacts: async (_parent, _args, { user }) => {
      return await Contact.query({
        where: {
          userID: user.id,
          id: { beginsWith: Contact.SK_PREFIX },
        },
      });
    },
  },
  Mutation: {
    createContact: async (_parent, { contactUserID }, { user }) => {
      // Sanitize contactUserID
      contactUserID = userModelHelpers.id.sanitizeAndValidate(contactUserID);

      return await ContactService.createContact({
        authenticatedUserID: user.id,
        contactUserID,
      });
    },
    deleteContact: async (_parent, { contactID }, { user }) => {
      // Sanitize contactID
      contactID = contactModelHelpers.id.sanitizeAndValidate(contactID);

      await Contact.deleteItem({ userID: user.id, id: contactID });

      return new DeleteMutationResponse({ success: true, id: contactID });
    },
  },
  Contact: {
    email: async (parent) => {
      const user = await UserService.getUserByHandle(parent);
      return user.email;
    },
    phone: async (parent) => {
      const user = await UserService.getUserByHandle(parent);
      return user.phone ?? null;
    },
    profile: async (parent) => {
      const user = await UserService.getUserByHandle(parent);
      return user.profile;
    },
  },
};
