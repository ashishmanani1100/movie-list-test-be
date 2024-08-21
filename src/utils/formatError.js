const { ApolloServerErrorCode } = require('@apollo/server/errors');
const { GraphQLError } = require('graphql');
const logger = require('../config/logger');

/**
 * Catch all grpahql errors and convert it into standarized error format.
 * @param {Error} formattedError - The error to format.
 * @returns {Object} Standarized error response.
 */
const formatError = (formattedError) => {
  logger.error(formattedError);

  // apollo server errors
  if (formattedError.extensions.code in ApolloServerErrorCode) {
    return {
      statusCode: 400,
      message: formattedError.message,
    };
  }

  // graphql errors
  if (formattedError instanceof GraphQLError) {
    // shield error
    if (formattedError.message === 'Not Authorised!') {
      return {
        statusCode: 401,
        message: formattedError.message,
      };
    }

    // other graphql error
    return {
      statusCode: 400,
      message: formattedError.message,
    };
  }

  // other type of error
  return {
    statusCode: 500,
    message: 'Something went wrong!',
  };
};

module.exports = formatError;
