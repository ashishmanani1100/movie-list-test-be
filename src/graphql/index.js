const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
