const { GraphQLError } = require('graphql');
const { movieValidation } = require('./../../validations');
const { validationService, s3Service } = require('./../../services');

const deleteMovie = async (_, args, { models: { Movie }, req: { user } }) => {
  const { movieId } = await validationService.validateArgs(args, movieValidation.deleteMovie);

  // validate movie
  const movie = await Movie.findById(movieId);
  if (!movie) throw new GraphQLError('Invalid movie id');

  // user can delete own movie
  if (movie.createdBy.toString() !== user.id.toString()) throw new GraphQLError('User can delete only own movie');

  // delete image from s3
  if (movie.poster) await s3Service.deleteObject(movie.poster);

  await Movie.deleteOne({ _id: movie._id });

  return movieId;
};

module.exports = deleteMovie;
