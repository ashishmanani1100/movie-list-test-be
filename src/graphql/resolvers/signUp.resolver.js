const { GraphQLError } = require('graphql');
const { authValidation } = require('./../../validations');
const { validationService, authService } = require('./../../services');

const signUp = async (_, args, { models: { User } }) => {
  const { email, password } = await validationService.validateArgs(args, authValidation.signUp);

  // check whether user with email is already exist or not
  if (await User.isEmailTaken(email)) throw new GraphQLError('User with same email already exist.');

  // create new user
  const user = await User.create({ email, password });

  // generate jwt access token
  const accessToken = await authService.generateAccessToken(user._id);

  return {
    user: { email },
    tokens: { accessToken },
  };
};

module.exports = signUp;
