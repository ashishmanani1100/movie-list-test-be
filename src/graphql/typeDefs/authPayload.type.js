const AuthPayload = `
  """ 
  Payload returned upon successful authentication. 
  """
  type AuthPayload {
    user: User
    tokens: Tokens
  }
`;

module.exports = AuthPayload;
