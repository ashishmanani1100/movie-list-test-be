const { GraphQLError } = require('graphql');
const { authValidation } = require('../../validations');
const { validationService, authService } = require('../../services');

const signIn = async (_, args, { models: { User } }) => {
  const { email, password } = await validationService.validateArgs(args, authValidation.signIn);

  // check whether user with email is exist or not
  const user = await User.findOne({ email });
  if (!user) throw new GraphQLError('User does not exist with given email');

  if (!(await user.isPasswordMatch(password))) throw new GraphQLError('Invalid password!');

  // generate jwt access token
  const accessToken = await authService.generateAccessToken(user._id);

  return {
    user: { email },
    tokens: { accessToken },
  };
};

module.exports = signIn;
