const Router = require('koa-router');
const router = new Router();
const jwt = require('./jwt');
const routes = require('../routes');
const graphql = require('./koa-graphql');
const passport = require('koa-passport');

router.get('/', routes.index);

router.all(
  '/graphql',
  async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      next();
    } else {
      await ctx.render('error', { message: 'Untauthorized' });
    }
  },
  graphql
);

router.post('/signup', routes.signUpPost);
router.get('/signup', routes.signUpGet);

router.post('/login', routes.loginPost);
router.get('/login', routes.loginGet);

router.get('/logout', routes.logout);

module.exports = router;
