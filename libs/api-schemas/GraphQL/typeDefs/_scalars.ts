export default `#graphql
  "Custom DateTime scalar with handling for Date objects and datetime strings"
  scalar DateTime

  "Custom Email scalar with regex validation"
  scalar Email
` satisfies string;
