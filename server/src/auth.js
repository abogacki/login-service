const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models/User');
const debug = require('debug')('auth');

passport.serializeUser((user, done) => {
  debug('serializing', user);
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  const dbUser = User.findById(user._id);
  debug('deserializing', dbUser);
  done(null, dbUser);
});

passport.use(
  new LocalStrategy(async (email, password, done) => {
    const dbUser = await User.findOne({ email });

    if (!dbUser) return done(null, false);

    if (!isValid) return done(null, false);

    if (!dbUser.validatePassword(password)) return done(null, false);

    return done(null, dbUser);
  })
);
