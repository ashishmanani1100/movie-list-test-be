const UserType = require('./user.type');
const TokenType = require('./token.type');
const AuthPayloadType = require('./authPayload.type');
const MovieType = require('./movie.type');
const EditImageType = require('./editImage.type');

// root schema types
const schemaType = `
 type Query {
    """ Retrieve a paginated list of movies. """
    getMovies(page: Int!, recordCount: Int): MoviePaginationType

    """ Fetch a single movie by its unique ID. """
    getMovieById(movieId: String!): Movie

    """ Add/Update the movie image specified by its ID. """
    editMovieImage(movieId: String, key: String): EditImage
  }

  type Mutation {
    """ Sign up using email and password to add user in system. """
    signUp(email: String!, password: String!): AuthPayload

    """ Sign in using email and password to get authentication tokens. """
    signIn(email: String!, password: String!): AuthPayload

    """ Create a new movie entry. """
    createMovie(title: String!, poster: String!, publishingYear: Int!): Movie

    """ Edit an existing movie's details. """
    editMovie(movieId: String, title: String!, poster: String, publishingYear: Int!): Movie

    """ Delete existing movie from system """
    deleteMovie(movieId: String!): String
  }
`;

module.exports = [schemaType, UserType, TokenType, AuthPayloadType, MovieType, EditImageType];
