const AuthService = require('../../services/AuthService');
const Router = require('koa-router');

const router = new Router();

const loginPost = async (ctx, next) => {
  const credentials = await AuthService.login(ctx.request.body);
  await ctx.login(credentials.user);
  ctx.body = {
    isAuth: ctx.isAuthenticated(),
    user: ctx.state.user,
  };
  next();
};

const loginGet = async (ctx, next) => {
  await ctx.render('login');
};

router.get('/', loginGet);
router.post('/', loginPost);

module.exports = router;
