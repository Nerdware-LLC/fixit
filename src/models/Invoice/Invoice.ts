import { ddbSingleTable, Model } from "@lib/dynamoDB";
import { USER_ID_REGEX } from "@models/User";
import { WORK_ORDER_ID_REGEX } from "@models/WorkOrder";
import { INVOICE_SK_REGEX } from "./regex";
import { createOne } from "./createOne";
import { updateOne } from "./updateOne";
import { deleteOne } from "./deleteOne";
import type { ModelSchemaOptions } from "@lib/dynamoDB";

/**
 * Invoice Model Methods:
 * @method `createOne()`
 * @method `updateOne()`
 * @method `deleteOne()`
 * @method `queryInvoiceByID()`
 * @method `queryUsersInvoices()`
 */
class InvoiceModel extends Model<typeof InvoiceModel.schema> {
  static readonly schema = {
    pk: {
      type: "string",
      alias: "createdByUserID",
      validate: (value: string) => USER_ID_REGEX.test(value),
      isHashKey: true,
      required: true
    },
    sk: {
      type: "string",
      alias: "id",
      validate: (value: string) => INVOICE_SK_REGEX.test(value),
      isRangeKey: true,
      required: true,
      index: {
        // For relational queryies using "sk" as the hash key
        name: "Overloaded_SK_GSI",
        global: true,
        rangeKey: "data",
        project: true
      }
    },
    data: {
      type: "string",
      alias: "assignedToUserID",
      validate: (value: string) => USER_ID_REGEX.test(value),
      required: true,
      index: {
        // For relational queries using "data" as the hash key
        name: "Overloaded_Data_GSI",
        global: true,
        rangeKey: "sk",
        project: true
      }
    },
    workOrderID: {
      type: "string",
      validate: (value: string) => WORK_ORDER_ID_REGEX.test(value)
    },
    amount: {
      type: "number"
    },
    status: {
      type: "string",
      validate: (value: string) => {
        return InvoiceModel.STATUSES.includes(value);
      },
      default: "OPEN"
    },
    stripePaymentIntentID: {
      type: "string"
    }
  } as const;

  static readonly schemaOptions: ModelSchemaOptions = {
    transformItem: {
      toDB: (invoiceItem: { id: string; createdAt: Date }) => ({
        ...invoiceItem,
        sk: `INV#${invoiceItem.id}#${Math.floor(new Date(invoiceItem.createdAt).getTime() / 1000)}`
      })
    }
  };

  static readonly STATUSES = ["OPEN", "CLOSED", "DISPUTED"];

  constructor() {
    super(ddbSingleTable, "Invoice", InvoiceModel.schema, InvoiceModel.schemaOptions);
  }

  readonly createOne = createOne;

  readonly updateOne = updateOne;

  readonly deleteOne = deleteOne;

  readonly queryInvoiceByID = async (invoiceID: string) => {
    return await this.query({
      IndexName: "Overloaded_SK_GSI",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": invoiceID },
      Limit: 1
    });
  };

  readonly queryUsersInvoices = async (userID: string) => {
    return await this.query({
      KeyConditionExpression: "pk = :userID AND begins_with(sk, :invSKprefix)",
      ExpressionAttributeValues: { ":userID": userID, ":invSKprefix": "INV#" }
    });
  };
}

export const Invoice = new InvoiceModel();
