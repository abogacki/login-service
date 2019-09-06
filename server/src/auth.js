const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((user, done) => {
  const user = User.findById(user._id);
  done(null, user);
});

passport.use(
  new LocalStrategy(async (email, password, done) => {
    const user = await User.findOne({ email });

    if (!user) return done(null, false);

    if (!isValid) return done(null, false);

    if (!user.validatePassword(password)) return done(null, false);

    return done(null, user);
  })
);
