const signIn = require('./signin.resolver');

const books = () => {
  return [
    { title: "title", authour: "manan" }
  ]
};

const resolvers = {
  Query: {
    books,
    signIn
  }
}


module.exports = resolvers;