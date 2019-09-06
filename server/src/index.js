const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const { connect } = require('./db');
const { schema } = require('./graphQL/schema');

app.keys = [process.env.API_KEY];
app.use(session(app));
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(mount('/graphql', graphqlHTTP({ schema, graphiql: true })));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  console.log(`Server started at ${PORT}`);
  connect();
});

module.exports = server;
