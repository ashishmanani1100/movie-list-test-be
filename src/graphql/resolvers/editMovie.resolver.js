const { GraphQLError } = require('graphql');
const { movieValidation } = require('./../../validations');
const { validationService } = require('./../../services');

const editMovie = async (_, args, { models: { Movie }, req: { user } }) => {
  const { movieId, title, poster, publishingYear } = await validationService.validateArgs(args, movieValidation.editMovie);

  // validate movie
  const movie = await Movie.findById(movieId);
  if (!movie) throw new GraphQLError('Invalid movie id');

  // user can edit only own movie
  if (movie.createdBy.toString() !== user.id.toString()) throw new GraphQLError('User can edit only own movie');

  if (movie.title !== title) {
    // movie title has been changed
    // check whether movie with same title already exist or not
    const existMovie = await Movie.exists({ title });
    if (existMovie) throw new GraphQLError('Movie with same title already exist.');

    movie.title = title;
  }

  if (poster) movie.poster = `movies_image/${poster}`;
  movie.publishingYear = publishingYear;

  // save updated changes
  await movie.save();

  return Movie.findById(movieId).populate('createdBy').lean();
};

module.exports = editMovie;
