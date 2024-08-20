const { authValidation } = require('./../../validations');
const { validateArgs } = require('./../../services/validation.service');
const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require("@apollo/server/errors");

const signIn = async (_, args, { models: { User } }) => {
  const { email, password } = await validateArgs(args, authValidation.signIn);

  console.log("calling sign in resolver ", email, password);

  const user = await User.findOne({ email: 'sean_bean@gameofthron.es' });
  
  console.log("user is ", user);


  
  return {
    user: { email: "test@gmail.com" },
    tokens: { accessToken: "abc" }
  }
};

module.exports = signIn;