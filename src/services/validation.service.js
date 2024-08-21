const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');

/**
 * Validates the provided object against the given schema.
 * @param {Object} object - The object to be validated.
 * @param {Object} schema - The Joi validation schema to validate the object against.
 * @returns {Promise<Object>} - Returns a promise that resolves to the validated object.
 * @throws {GraphQLError} - Throws a GraphQLError if the object fails validation, with a BAD_USER_INPUT code.
 */
const validateArgs = async (object, schema) => {
  try {
    return await schema.validateAsync(object);
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  }
};

module.exports = { validateArgs };
