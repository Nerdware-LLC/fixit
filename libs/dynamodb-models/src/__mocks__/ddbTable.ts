import { Table } from "@nerdware/ddb-single-table";
import { tableKeysSchema } from "../tableKeysSchema.js";

/**
 * Mock DDB Table instance for testing purposes.
 */
export const ddbTable = new Table({ tableName: "MockTable", tableKeysSchema });
