const passport = require('koa-passport');
const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  const dbUser = await User.findById(userId);
  done(null, dbUser);
});

const localStrategy = require('./strategies/localAuthStrategy');
const facebookStrategy = require('./strategies/facebookAuthStrategy');
passport.use('local', localStrategy);
passport.use('facebook', facebookStrategy);
