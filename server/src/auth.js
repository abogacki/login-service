const passport = require('koa-passport');
const { User } = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('user not found');
    done(user);
  } catch (error) {
    done(null, false);
  }
});

const options = {};

passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    const user = await User.where('email')
      .equals(email)
      .exec();

    return done(null, user);
  })
);
