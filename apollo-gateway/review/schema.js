const { gql } = require('apollo-server');

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )
  type Review {
    id: ID!
    rating: Float!
    content: String!
    users: [user]
  }
  type user @key(fields: "id") @shareable {
    id: Int!
  }

  type Product @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }
`;

module.exports = { typeDefs };
