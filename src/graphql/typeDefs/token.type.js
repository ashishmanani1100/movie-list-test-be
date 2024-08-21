const Token = `
  """
  The Tokens type represents the authentication tokens issued to a user.
  """
  type Tokens {
    accessToken: Token
  }

  """
  Information about an individual authentication token.
  """
  type Token {
    token: String
    expires: String
  }
`;

module.exports = Token;
