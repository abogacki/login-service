const passport = require('koa-passport');

const get = passport.authenticate('facebook');
const callback = passport.authenticate(
  'facebook',
  { failureRedirect: '/login' },
  ctx => ctx.redirect('/')
);

module.exports = {
  get,
  callback,
};
