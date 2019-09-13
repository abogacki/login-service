const passport = require('koa-passport');
const Router = require('koa-router');

const router = new Router();

router.get(
  '/',
  passport.authenticate('local', (err, user, info, status) => {
    console.log(err);
    console.log(user);
    console.log(info);
    console.log(status);
  })
);

router.get(
  '/callback',
  passport.authenticate(
    'local',
    { failureRedirect: '/login' },
    ctx => (ctx.body = ctx.state.user)
  )
);

module.exports = router;
