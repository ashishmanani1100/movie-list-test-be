const { GraphQLError } = require("graphql");
const { ApolloServerErrorCode } = require("@apollo/server/errors");

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
