const Movie = `
  """
  Movie with its details.
  """
  type Movie {
    _id: String
    title: String!
    poster: String
    publishingYear: Int
    createdBy: User
    createdAt: String
    updatedAt: String
  }

  """
  Paginated list of movies.
  """
  type MoviePaginationType {
    totalCount: Int!
    page: Int!
    data: [Movie]
  }
`;

module.exports = Movie;
