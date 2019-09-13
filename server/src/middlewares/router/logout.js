const Router = require('koa-router');

const router = new Router();

const logout = async (ctx, next) => {
  await ctx.logout();
  ctx.redirect('/login');
};

router.get('/', logout);

module.exports = router;
