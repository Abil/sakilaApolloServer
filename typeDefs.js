const { gql } = require("apollo-server");

const typeDefs = gql`
  type Film {
    film_id: ID!
    title: String!
    description: String
    release_year: Int
    language_id: Int!
    original_language_id: Int
    rental_duration: Int!
    rental_rate: Float!
    length: Int
    replacement_cost: Float!
    rating: String!
    special_features: String
    last_update: String!
    actors: [Actor]
  }

  type Actor {
    actor_id: ID!
    first_name: String!
    last_name: String!
    last_update: String!
    films: [Film]
  }

  type FilmActor {
    actor_id: ID!
    film_id: ID!
  }

  type Query {
    films: [Film]
    film(id: ID!): Film
    actors: [Actor]
    actor(id: ID!): Actor
  }

  type Mutation {
    addFilm(
      title: String!
      description: String
      release_year: Int
      language_id: Int!
      original_language_id: Int
      rental_duration: Int!
      rental_rate: Float!
      length: Int
      replacement_cost: Float!
      rating: String!
      special_features: String
    ): Film
    editFilm(id: ID!, title: String, description: String): Film
    deleteFilm(id: ID!): Boolean
    addActor(first_name: String!, last_name: String!): Actor
    editActor(id: ID!, first_name: String, last_name: String): Actor
    deleteActor(id: ID!): Boolean
    addFilmActor(actor_id: ID!, film_id: ID!): FilmActor
    deleteFilmActor(actor_id: ID!, film_id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
