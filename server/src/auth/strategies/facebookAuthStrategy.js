const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../models/User');

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await User.findOneOrCreate({
        facebookId: profile.id,
      });
      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  }
);

module.exports = facebookStrategy;
