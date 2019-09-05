const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');

const typeDefs = importSchema(__dirname + '/schema.graphql');

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };
