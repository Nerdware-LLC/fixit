import type { CodegenConfig } from "@graphql-codegen/cli";

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
  require: ["ts-node/register"],
  emitLegacyCommonJSImports: false,
  generates: {
    // GQL Schema Types:
    "libs/api-schemas/GraphQL/types/__codegen__/graphqlSchemaTypes.ts": {
      schema: "libs/api-schemas/GraphQL/typeDefs/**",
      // TODO Maybe move 'schema' to upper/outer level if they stay the same
      plugins: ["typescript"],
      // Plugin configs:
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
        namingConvention: "keep",
        scalars: {
          ID: "string",
          DateTime: "Date",
          Email: "string",
        },
      },
    },

    // GQL Resolver Types:
    // TODO Uncomment below and update values once ddb types are ready for mappers.

    // "libs/api-schemas/GraphQL/types/__codegen__/graphqlResolverTypes.ts": {
    //   schema: "libs/api-schemas/GraphQL/typeDefs/**",
    //   plugins: ["typescript-resolvers"],
    //   // Plugin configs:
    //   config: {
    //     useIndexSignature: true, // Adds an index signature to generated resolvers
    //     contextType: "@/apolloServer.js#ApolloServerContext", // Resolver context type
    //     defaultMapper: "Partial<{T}>",
    //     mappers: {
    //       Contact: "@/models/Contact/Contact.js#ContactItem",
    //       PublicUserFields: "@/graphql/PublicUserFields/types.js#PublicUserFieldsCodegenInterface",
    //       Invoice: "@/models/Invoice/Invoice.js#InvoiceItem",
    //       WorkOrder: "@/models/WorkOrder/WorkOrder.js#WorkOrderItem",
    //       UserSubscription: "@/models/UserSubscription/UserSubscription.js#UserSubscriptionItem",
    //       UserStripeConnectAccount:
    //         "@/models/UserStripeConnectAccount/UserStripeConnectAccount.js#UserStripeConnectAccountItem",
    //     },
    //   },
    // },
  },
};

export default codegenConfig;
