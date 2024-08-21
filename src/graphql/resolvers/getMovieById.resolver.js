const { movieValidation } = require('./../../validations');
const { validationService, s3Service } = require('./../../services');

const getMovieById = async (_, args, { models: { Movie } }) => {
  const { movieId } = await validationService.validateArgs(args, movieValidation.getMovieById);
  const movie = await Movie.findById(movieId).populate('createdBy').lean();
  if (movie.poster) movie.poster = await s3Service.signedGetObjectUrl(movie.poster);
  return movie;
};

module.exports = getMovieById;
