const { movieValidation } = require('./../../validations');
const { validationService, s3Service } = require('./../../services');
const { PAGE_LIMIT } = require('./../../utils/constants');

const getMovies = async (_, args, { models: { Movie }, req: { user } }) => {
  const { page, recordCount } = await validationService.validateArgs(args, movieValidation.getMovies);

  const limit = recordCount || PAGE_LIMIT;
  const skip = (page - 1) * limit;

  const searchConditions = {};
  if (user.id) searchConditions.createdBy = user.id;

  const data = await Movie.find(searchConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('createdBy')
    .lean();

  const moviesPromise = data.map(async (movie) => {
    if (movie.poster) movie.poster = await s3Service.signedGetObjectUrl(movie.poster);
    return movie;
  });

  return {
    totalCount: await Movie.countDocuments(searchConditions),
    page,
    data: await Promise.all(moviesPromise),
  };
};

module.exports = getMovies;
