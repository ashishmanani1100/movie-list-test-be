const { GraphQLError } = require('graphql');
const { movieValidation } = require('./../../validations');
const { validationService } = require('./../../services');

const createMovie = async (_, args, { models: { Movie }, req: { user } }) => {
  const { title, poster, publishingYear } = await validationService.validateArgs(args, movieValidation.createMovie);

  // check whether movie with same title already exist or not
  const existMovie = await Movie.exists({ title });
  if (existMovie) throw new GraphQLError('Movie with same title already exist.');

  // create movie
  const movie = await Movie.create({ title, poster: `movies_image/${poster}`, publishingYear, createdBy: user.id });

  return Movie.findById(movie._id).populate('createdBy');
};

module.exports = createMovie;
