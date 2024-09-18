import type { TableKeysSchemaType } from "@nerdware/ddb-single-table";

export const tableKeysSchema = {
  pk: {
    type: "string",
    required: true,
    isHashKey: true,
  },
  sk: {
    type: "string",
    required: true,
    isRangeKey: true,
    index: {
      name: "Overloaded_SK_GSI", // For queries using "sk" as the hash key
      rangeKey: "data",
      global: true,
      project: true, // all attributes
      throughput: { read: 5, write: 5 },
    },
  },
  data: {
    type: "string",
    required: true,
    index: {
      name: "Overloaded_Data_GSI", // For queries using "data" as the hash key
      rangeKey: "sk",
      global: true,
      project: true, // all attributes
      throughput: { read: 5, write: 5 },
    },
  },
} as const satisfies TableKeysSchemaType;
