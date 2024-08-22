const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require('@apollo/server/express4');
const { applyMiddleware } = require('graphql-middleware');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');
const formatError = require('./utils/formatError');
const models = require('./models');
const shield = require('./shield');
const graphqlSchema = require('./graphql');

const app = express();
const httpServer = http.createServer(app);

// parse json request body
app.use(express.json({ limit: '2mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// For AWS load banalcer to check health of the backend API
app.get('/healthchecks', (req, res) => {
  return res.status(200).send({ message: 'Success' });
});

// configure graphql server
const server = new ApolloServer({
  schema: applyMiddleware(graphqlSchema, shield), // graphql shcema with shield authentication
  cache: 'bounded', // prevent memory overflow and ensure efficient caching
  formatError, // handle graphql errors
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageProductionDefault({ embed: true }),
  ], // drain http server and enable playground
  context: async ({ req, res }) => {
    return { req, res, models };
  },
  introspection: true, // allow introspection in product environment
  playground: true, // add playground
});

(async () => {
  await server.start();
  server.applyMiddleware({ app }); // attach apollo server to app
  app.use('/graphql', expressMiddleware(server)); // integrate apollo server to /graphql path
})();

// send back a 404 error for any unknown api request except /graphql
app.use((req, res, next) => {
  if (req.originalUrl !== '/graphql') {
    return res.status(404).send('Not found');
  } else {
    next();
  }
});

module.exports = app;
