const UserType = require('./user.type');
const TokenType = require('./token.type');
const AuthPayloadType = require('./authPayload.type');

const schemaType = `
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    signIn(email: String!, password: String!): AuthPayload
  }
`;

module.exports = [
  schemaType,
  UserType,
  TokenType,
  AuthPayloadType
];
