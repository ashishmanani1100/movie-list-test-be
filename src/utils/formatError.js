const { ApolloServerErrorCode } = require('@apollo/server/errors');
const { GraphQLError } = require('graphql');
const logger = require('../config/logger');

const formatError = (formattedError) => {
  logger.error(formattedError);
  console.log(formattedError.extensions?.code);

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
  if (formattedError.extensions.code in ApolloServerErrorCode) {
    // apollo server error
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
