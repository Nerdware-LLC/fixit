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

const IS_DEV = NODE_ENV === "development";

export const ddbTable = new Table({
  tableName: DYNAMODB_TABLE_NAME,
  tableKeysSchema,
  ddbClient: {
    region: DYNAMODB_REGION,
    ...(DYNAMODB_ENDPOINT && { endpoint: DYNAMODB_ENDPOINT }),
    // dynamodb-local is used in dev
    ...(IS_DEV && {
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

// In DEV, ensure the target DDB table is connected and configured:
if (IS_DEV) {
  await ddbTable.ensureTableIsActive({
    createIfNotExists: {
      BillingMode: "PROVISIONED",
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  });
}
