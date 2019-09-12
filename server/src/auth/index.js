const passport = require('koa-passport');
const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  const dbUser = User.findById(userId);
  done(null, dbUser);
});

const localStrategy = require('./strategies/localAuthStrategy');
passport.use(localStrategy);
