const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const graphqlHTTP = require('koa-graphql');
const { connect } = require('./db');
const { schema } = require('./graphQL/schema');

require('./auth');

app.keys = [process.env.API_KEY];
app.use(session(app));
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

// graphql router setup
const Router = require('koa-router');
const router = new Router();
const jwt = require('./middlewares/jwt');
const routes = require('./routes');

router.all('/graphql', jwt, graphqlHTTP({ schema, graphiql: true }));
router.post('/signup', routes.signUpPost);
router.get('/signup', routes.signUpGet);

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  console.log(`Server started at ${PORT}`);
  connect();
});

module.exports = server;
