const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require('@apollo/server/express4');
const { applyMiddleware } = require('graphql-middleware');
const formatError = require('./utils/formatError');
const models = require('./models');

const graphqlSchema = require('./graphql');

const app = express();
// parse json request body
app.use(express.json({ limit: '10mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
//   res.send("govaejigo")
// });

const server = new ApolloServer({
  // schema: applyMiddleware(schema, shield),
  schema: graphqlSchema,
  // cache: 'bounded',
  formatError,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ req, res }) => {
    return { req, res, models };
  },
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.use('/graphql', expressMiddleware(server));
})();

module.exports = app;