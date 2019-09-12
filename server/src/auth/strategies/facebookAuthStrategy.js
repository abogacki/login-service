const FacebookStrategy = require('passport-facebook').Strategy;

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findByIdAndUpdate({ facebookId: profile.id }, (err, user) => {
      return cb(err, user);
    });
  }
);

module.exports = facebookStrategy;
