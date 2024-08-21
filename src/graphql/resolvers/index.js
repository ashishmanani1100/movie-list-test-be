const signUp = require('./signUp.resolver');
const signIn = require('./signIn.resolver');
const createMovie = require('./createMovie.resolver');
const editMovie = require('./editMovie.resolver');
const editMovieImage = require('./editMovieImage.resolver');
const getMovies = require('./getMovies.resolver');
const getMovieById = require('./getMovieById.resolver');
const deleteMovie = require('./deleteMovie.resolver');

const resolvers = {
  Query: {
    getMovies,
    getMovieById,
    editMovieImage,
  },
  Mutation: {
    signUp,
    signIn,
    createMovie,
    editMovie,
    deleteMovie,
  },
};

module.exports = resolvers;
