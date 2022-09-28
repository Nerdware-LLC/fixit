import merge from "lodash.merge";
import { DDBSingleTableClient } from "./DDBSingleTableClient";
import { ensureTableIsActive } from "./ensureTableIsActive";
import { SchemaValidationError } from "./customErrors";
import { Model } from "./Model";
import type { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import type { TranslateConfig } from "@aws-sdk/lib-dynamodb";
import type {
  TableKeysSchemaType,
  ModelSchemaType,
  ModelSchemaOptions,
  AliasedModelSchemaType,
  DDBTableIndexes,
  DDBTableProperties
} from "./types";

// TODO Add jsdoc once further ironed out
export class DDBSingleTable<TableKeysSchema extends TableKeysSchemaType> {
  private static readonly DEFAULTS = {
    WAIT_FOR_ACTIVE: {
      enabled: true,
      timeout: 30000,
      frequency: 1000,
      maxAttempts: 20
    },
    TABLE_CONFIGS: {
      createIfNotExists: false,
      updateIfExists: false // TODO impl this
    }
  };

  // INSTANCE PROPERTIES
  readonly tableName: string;
  readonly tableKeysSchema: TableKeysSchema;
  readonly indexes: DDBTableIndexes;
  readonly ddbClient: DDBSingleTableClient;
  readonly waitForActive: typeof DDBSingleTable.DEFAULTS.WAIT_FOR_ACTIVE;
  readonly tableConfigs: typeof DDBSingleTable.DEFAULTS.TABLE_CONFIGS & DDBTableProperties;

  constructor({
    tableName,
    tableKeysSchema,
    ddbClientConfigs = {},
    waitForActive = DDBSingleTable.DEFAULTS.WAIT_FOR_ACTIVE,
    tableConfigs = DDBSingleTable.DEFAULTS.TABLE_CONFIGS
  }: {
    tableName: string;
    tableKeysSchema: TableKeysSchema;
    ddbClientConfigs?: Expand<DynamoDBClientConfig & TranslateConfig>;
    waitForActive?: Partial<typeof DDBSingleTable.DEFAULTS.WAIT_FOR_ACTIVE>;
    tableConfigs?: Partial<typeof DDBSingleTable.DEFAULTS.TABLE_CONFIGS> & DDBTableProperties;
  }) {
    this.tableName = tableName;
    this.tableKeysSchema = tableKeysSchema;
    this.waitForActive = {
      ...DDBSingleTable.DEFAULTS.WAIT_FOR_ACTIVE,
      ...waitForActive
    };
    this.tableConfigs = {
      ...DDBSingleTable.DEFAULTS.TABLE_CONFIGS,
      ...tableConfigs
    };

    // Initialize DDB client
    this.ddbClient = new DDBSingleTableClient({
      tableName,
      ddbClientConfigs
    });

    // Identify the indexes, if any, to provide a map user can use to build query args.
    this.indexes = Object.entries(tableKeysSchema).reduce((accum, [keyAttrName, keyAttrConfig]) => {
      if (keyAttrConfig?.index) {
        accum[keyAttrConfig.index.name] = {
          name: keyAttrConfig.index.name,
          type: keyAttrConfig.index?.global === true ? "GLOBAL" : "LOCAL",
          indexPK: keyAttrName,
          ...(keyAttrConfig.index?.rangeKey && { indexSK: keyAttrConfig.index.rangeKey })
        };
      }

      return accum;
    }, {} as DDBTableIndexes);
  }

  // INSTANCE METHODS

  readonly ensureTableIsActive = ensureTableIsActive<TableKeysSchema>;

  readonly model = <Schema extends ModelSchemaType>(
    modelName: string,
    modelSchema: Schema,
    modelSchemaOptions: ModelSchemaOptions = {}
  ) => {
    // Ensure all table keys are present in the schema and that "type" is the same if provided.
    Object.keys(this.tableKeysSchema).forEach((tableKey) => {
      if (!(tableKey in modelSchema)) {
        throw new SchemaValidationError(
          `"${modelName}" Model schema does not contain key attribute "${tableKey}".`
        );
      }

      // Ensure the Model schema doesn't specify an invalid "type" in key configs.
      if (
        Object.prototype.hasOwnProperty.call(modelSchema[tableKey], "type") &&
        modelSchema[tableKey].type !== this.tableKeysSchema[tableKey].type
      ) {
        throw new SchemaValidationError(
          `"${modelName}" Model schema defines a different "type" for "${tableKey}" than is specified in the Table Keys Schema.`
        );
      }
    });

    return new Model<Schema, AliasedModelSchemaType<Schema>>(
      modelName,
      merge(this.tableKeysSchema, modelSchema),
      modelSchemaOptions,
      this.ddbClient
    );
  };
}
