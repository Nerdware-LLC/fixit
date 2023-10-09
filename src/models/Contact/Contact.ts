import { Model } from "@nerdware/ddb-single-table";
import { userModelHelpers } from "@/models/User/helpers";
import { COMMON_ATTRIBUTES } from "@/models/_common";
import { ddbTable } from "@/models/ddbTable";
import { isValid } from "@/utils/clientInputHandlers";
import { contactModelHelpers } from "./helpers";
import { CONTACT_SK_PREFIX_STR } from "./regex";
import type { ItemTypeFromSchema, ItemCreationParameters } from "@nerdware/ddb-single-table";

/**
 * Contact DdbSingleTable Model
 */
class ContactModel extends Model<typeof ContactModel.schema> {
  static readonly schema = ddbTable.getModelSchema({
    pk: {
      type: "string",
      alias: "userID",
      validate: userModelHelpers.id.isValid,
      required: true,
    },
    sk: {
      type: "string",
      alias: "id", // Contact "sk" contains the "contactUserID"
      default: (contact: { data: string }) => contactModelHelpers.id.format(contact.data),
      validate: contactModelHelpers.id.isValid,
      required: true,
    },
    data: {
      type: "string",
      alias: "contactUserID",
      validate: userModelHelpers.id.isValid,
      required: true,
    },
    handle: {
      type: "string",
      validate: (value: string) => isValid.handle(value),
      required: true,
    },
    ...COMMON_ATTRIBUTES.TIMESTAMPS, // "createdAt" and "updatedAt" timestamps
  } as const);

  constructor() {
    super("Contact", ContactModel.schema, ddbTable);
  }

  // CONTACT MODEL — Instance properties and methods:
  readonly SK_PREFIX = CONTACT_SK_PREFIX_STR;
  readonly getFormattedID = contactModelHelpers.id.format;
  readonly isValidID = contactModelHelpers.id.isValid;
}

export const Contact = new ContactModel();

/** The shape of a `Contact` object returned from ContactModel methods. */
export type ContactItem = ItemTypeFromSchema<typeof ContactModel.schema>;

/** `Contact` item params for `createItem()`. */
export type ContactItemCreationParams = ItemCreationParameters<typeof ContactModel.schema>;

/**
 * The shape of a `Contact` object in the DB.
 * > This type is used to mock `@aws-sdk/lib-dynamodb` responses.
 */
export type UnaliasedContactItem = ItemTypeFromSchema<
  typeof ContactModel.schema,
  {
    aliasKeys: false;
    optionalIfDefault: false;
    nullableIfOptional: true;
  }
>;
