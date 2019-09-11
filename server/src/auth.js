const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models/User');

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((userId, done) => {
	const dbUser = User.findById(userId);
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
