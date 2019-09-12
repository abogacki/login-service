const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const { connect } = require('./db');

require('./auth');

const CONFIG = {
  key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
};

app.keys = [process.env.API_KEY];
app.use(session(CONFIG, app));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

const path = require('path');
const views = require('koa-views');
app.use(views(path.join(__dirname, 'views')));

const router = require('./middlewares/router');
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  console.log(`Server started at ${PORT}`);
  connect();
});

module.exports = server;
