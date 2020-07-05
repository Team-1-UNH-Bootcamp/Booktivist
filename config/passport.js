const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const db = require('../models');


// Telling passport we want to use a Local Strategy
// In other words, we want login with a username/email and password
passport.use(new LocalStrategy(

  {

    // by default, local strategy uses username and password, we will override with email

    usernameField: 'email',

    // passwordField: 'password',

  },

  (email, password, done) => {
    const isValidPassword = (userpass, password1) => bcrypt.compareSync(password1, userpass);

    db.User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'Email does not exist',
        });
      }
      console.log(`what is pass ${user.password}`);
      console.log(`what is password ${password}`);
      if (!isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      return done(null, user);
    }).catch((err) => {
      console.log('Error:', err);

      return done(null, false, {
        message: 'Something went wrong with your Sign in',
      });
    });
  },

));


// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
