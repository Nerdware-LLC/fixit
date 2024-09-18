import { Table } from "@nerdware/ddb-single-table";
import chalk from "chalk";
import { getLoggerUtil } from "@fixit/node-logger";
import { tableKeysSchema } from "./tableKeysSchema.js";

const {
  NODE_ENV,
  AWS_REGION,
  DYNAMODB_REGION = AWS_REGION,
  DYNAMODB_TABLE_NAME,
  DYNAMODB_ENDPOINT,
} = process.env; // eslint-disable-line n/no-process-env

if (!DYNAMODB_TABLE_NAME || !DYNAMODB_REGION) {
  throw new Error("Missing required environment variables");
}

export const ddbTable = new Table({
  tableName: DYNAMODB_TABLE_NAME,
  tableKeysSchema,
  ddbClient: {
    region: DYNAMODB_REGION,
    ...(DYNAMODB_ENDPOINT && { endpoint: DYNAMODB_ENDPOINT }),
    // dynamodb-local is used in dev
    ...(NODE_ENV === "development" && {
      credentials: {
        accessKeyId: "local",
        secretAccessKey: "local",
      },
    }),
  },
  logger: getLoggerUtil({
    label: "DynamoDB",
    msgColor: chalk.blue,
    isEnabledInDeployedEnvs: true,
  }),
});
