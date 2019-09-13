const passport = require('koa-passport');
const Router = require('koa-router');

const router = new Router();

router.get('/', passport.authenticate('facebook'));
router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

module.exports = router;
