const { rule, shield, allow, or } = require('graphql-shield');
const { getUserFromToken } = require('./services/auth.service');

// user token
const isUser = rule()(async (_, __, { req }) => {
  const user = await getUserFromToken(req);

  if (!user) throw new Error('Not Authorised!');
  req.user = user;
  return true;
});

// doest not have token
const noToken = rule()(async (_, __, { req }) => {
  req.user = {};
  return true;
});

module.exports = shield(
  {
    Query: {
      getMovies: or(noToken, isUser),
      getMovieById: isUser,
      editMovieImage: or(noToken, isUser),
      '*': allow,
    },

    Mutation: {
      createMovie: isUser,
      editMovie: isUser,
      deleteMovie: isUser,
      '*': allow,
    },
  },
  { allowExternalErrors: true },
);
