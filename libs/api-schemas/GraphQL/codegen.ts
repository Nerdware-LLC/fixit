import type { CodegenConfig } from "@graphql-codegen/cli";

const GQL_TYPES_DIR = "libs/api-schemas/GraphQL/types";
const DDB_MODELS_SRC_DIR = "libs/dynamodb-models/src";

/**
 * ### `@graphql-codegen` config file
 *
 * This file is used by the `@graphql-codegen/cli` package to generate
 * TypeScript types for GQL Schema typeDefs and resolvers.
 *
 * - Docs for `@graphql-codegen`:
 *   - https://graphql-code-generator.com/docs/getting-started/codegen-config
 *   - https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config#other-ways-to-provide-configuration
 *
 * - Docs for plugin `typescript-resolvers`:
 *   - https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
 */
const codegenConfig: CodegenConfig = {
  schema: "libs/api-schemas/GraphQL/typeDefs/**",
  require: ["ts-node/register"],
  emitLegacyCommonJSImports: false,
  generates: {
    [`${GQL_TYPES_DIR}/__codegen__/graphqlSchemaTypes.ts`]: {
      plugins: ["typescript", "typescript-resolvers"],
      // Plugin configs:
      config: {
        // typescript plugin configs:
        enumsAsTypes: true,
        useTypeImports: true,
        scalars: {
          ID: "string",
          Email: "string",
          DateTime: "Date",
        },

        // typescript-resolvers plugin configs:
        useIndexSignature: true, // Adds an index signature to generated resolvers
        contextType: "libs/apollo-graphql/src/types/ApolloServerContext.js#ApolloServerContext", // Resolver context type
        defaultMapper: "Partial<{T}>",
        mappers: {
          // GQL types mapped to explicit overrides:
          PublicUserFields: `${GQL_TYPES_DIR}/PublicUserFields.js#PublicUserFieldsCodegenInterface`,
          // GQL types mapped to models:
          Contact: `${DDB_MODELS_SRC_DIR}/Contact/Contact.js#ContactItem`,
          Invoice: `${DDB_MODELS_SRC_DIR}/Invoice/Invoice.js#InvoiceItem`,
          WorkOrder: `${DDB_MODELS_SRC_DIR}/WorkOrder/WorkOrder.js#WorkOrderItem`,
          UserSubscription: `${DDB_MODELS_SRC_DIR}/UserSubscription/UserSubscription.js#UserSubscriptionItem`,
          UserStripeConnectAccount: `${DDB_MODELS_SRC_DIR}/UserStripeConnectAccount/UserStripeConnectAccount.js#UserStripeConnectAccountItem`,
        },
      },
    },
  },
};

export default codegenConfig;
