const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Save user profile to the database or perform other operations
    return done(null, profile);
  }
));
