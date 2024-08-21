const Joi = require('joi');
const errorMessage = require('../utils/errorMessage');
const { MONGODB_OBJECT_ID_REGEX, IMAGE_KEY_ACCEPTED_CHATACTER_REGEX } = require('../utils/constants');

const createMovie = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .max(200)
    .messages(errorMessage('Title', null, null, 200)),
  poster: Joi.string()
    .trim()
    .required()
    .max(200)
    .messages(errorMessage('Poster', null, null, 200)),
  publishingYear: Joi.number()
    .required()
    .min(1900)
    .max(2024)
    .messages(errorMessage('Publishing year', null, 1900, 2024)),
});

const editMovie = Joi.object({
  movieId: Joi.string().trim().required().regex(MONGODB_OBJECT_ID_REGEX).messages(errorMessage('Movie id')),
  title: Joi.string()
    .trim()
    .required()
    .max(200)
    .messages(errorMessage('Title', null, null, 200)),
  poster: Joi.string()
    .trim()
    .max(200)
    .messages(errorMessage('Poster', null, null, 200)),
  publishingYear: Joi.number()
    .required()
    .min(1900)
    .max(2024)
    .messages(errorMessage('Publishing year', null, 1900, 2024)),
});

const editMovieImage = Joi.object({
  movieId: Joi.string().trim().regex(MONGODB_OBJECT_ID_REGEX).messages(errorMessage('Movie id')),
  key: Joi.string()
    .trim()
    .max(200)
    .replace(IMAGE_KEY_ACCEPTED_CHATACTER_REGEX, '')
    .messages(errorMessage('Key', null, null)),
});

const getMovies = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages(errorMessage('Page', null, 1)),
  recordCount: Joi.number()
    .integer()
    .min(0)
    .messages(errorMessage('Record count', null, 0)),
});

const getMovieById = Joi.object({
  movieId: Joi.string().trim().required().regex(MONGODB_OBJECT_ID_REGEX).messages(errorMessage('Movie id')),
});

const deleteMovie = Joi.object({
  movieId: Joi.string().trim().required().regex(MONGODB_OBJECT_ID_REGEX).messages(errorMessage('Movie id')),
});

module.exports = {
  createMovie,
  editMovie,
  editMovieImage,
  getMovies,
  getMovieById,
  deleteMovie,
};
