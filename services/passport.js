const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

require('../models/User');

const Users = mongoose.model('User'); // To fetch users from mongo db

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // when the user give us permission to access their profile, the user is thrown back to this URL with a code from google attached to the URL
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // DESTRUCTURE THE PROFILE OBJECT
      const { id, emails } = profile;
      const existingUser = await Users.findOne({
        email: emails[0].value,
      });
      if (existingUser) {
        // There is an existing user, be careful not to duplicate records
        if (!existingUser.googleID) {
            // First-time Google login for a user who originally signed up with email/password
          existingUser.googleID = id;
          await existingUser.save();
        }

        return done(null, existingUser);
      } else {
        // USER DOES NOT EXIST, CREATE A NEW RECORD
        const newUser = await new Users({
          googleID: id,
          email: emails[0].value,
        }).save();

        // THIS ASSIGNS THE VALUE OF newUser TO req.user
         done(null, newUser);
      }
    }
  )
);
