const graphqlHTTP = require('koa-graphql');
const schema = require('../graphQL/schema');

module.exports = graphqlHTTP({ schema, graphiql: true });
