const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy(async (email, password, done) => {
  console.log(email, password);

  const dbUser = await User.findOne({ email });

  if (!dbUser) return done(null, false);

  if (!isValid) return done(null, false);

  if (!dbUser.validatePassword(password)) return done(null, false);

  return done(null, dbUser);
});

module.exports = localStrategy;
