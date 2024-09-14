export default `#graphql
  extend type Mutation {
    createInvite(phoneOrEmail: String!): MutationResponse!
  }
` satisfies string;
