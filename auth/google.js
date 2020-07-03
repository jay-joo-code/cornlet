const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

const ROOT_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8081'
  : process.env.REACT_APP_CLIENT_DOMAIN;

passport.use(new GoogleStrategy({
  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  callbackURL: `${ROOT_URL}/api/auth/google/callback`,
},
(async (accessToken, refreshToken, profile, done) => {
  // find current user in UserModel
  const existingUser = await User.findOne({
    email: profile.emails[0].value,
  });

  // create new user if the database doesn't have this user
  if (!existingUser) {
    const { id, displayName, emails, photos } = profile;
    const newUser = await new User({
      uid: id,
      name: displayName,
      photo: photos[0].value,
      email: emails[0].value,
    }).save();
    done(null, newUser);
  }
  else {
    done(null, existingUser);
  }
})));

module.exports = passport;
