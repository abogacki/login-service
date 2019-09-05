const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = importSchema(__dirname + '/schema.graphql');
const resolvers = {};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };
