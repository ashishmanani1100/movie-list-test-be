const { GraphQLError } = require('graphql');
const { validationService, s3Service } = require('../../services');
const { movieValidation } = require('../../validations');

const editMovieImage = async (_, args, { models: { Movie }, req: { user } }) => {
  let { movieId, key } = await validationService.validateArgs(args, movieValidation.editMovieImage);

  if (!(movieId || key)) throw new GraphQLError('Either the key or the movieId is required');

  let movieImageKey;
  let publicUrl;

  if (movieId) {
    // vallidate movieId
    const movie = await Movie.findById(movieId);
    if (!movie) throw new GraphQLError('Invalid movie');

    // check whether movie is created by the user from token
    if (movie.createdBy.toString() !== user.id.toString()) throw new GraphQLError("User can edit only own movie's image");

    if (movie.poster) {
      movieImageKey = movie.poster;
      publicUrl = await s3Service.signedGetObjectUrl(movieImageKey);
    } else if (!key) throw new GraphQLError('Key is required');
  }

  if (key) {
    const keyArr = key.split('.');
    key = `${keyArr[0]}-${Date.now()}.${keyArr[1]}`;
    movieImageKey = `movies_image/${key}`;
  }

  const putObjectUrl = await s3Service.signedPutObjectUrl(movieImageKey);

  return {
    putObjectUrl,
    publicUrl,
    key,
  };
};

module.exports = editMovieImage;
