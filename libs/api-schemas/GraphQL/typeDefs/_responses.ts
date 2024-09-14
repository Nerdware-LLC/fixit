export default `#graphql
  "A generic mutation response type."
  interface MutationResponse {
    "Whether the mutation was successful."
    success: Boolean!
    """
    A code for the mutation response. This may be an HTTP status code, like '200',
    or a GraphQLError code, like 'BAD_USER_INPUT', depending on what makes sense
    for the implementing type.
    """
    code: String
    "An optional message to provide additional info about the mutation response."
    message: String
  }

  "A mutation response type for delete operations."
  type DeleteMutationResponse implements MutationResponse {
    success: Boolean!
    code: String
    message: String
    "The ID of the deleted entity."
    id: ID!
  }
` satisfies string;
