export default `#graphql
  type ChecklistItem {
    id: ID!
    description: String!
    isCompleted: Boolean!
  }

  input CreateChecklistItemInput {
    description: String!
    isCompleted: Boolean
  }

  input UpdateChecklistItemInput {
    id: ID
    description: String!
    isCompleted: Boolean
  }
` satisfies string;
