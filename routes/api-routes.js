/* eslint-disable comma-dangle */
const router = require('express').Router();
const db = require('../models');
const passport = require('../config/passport');

router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});
router.post('/api/admin/login', passport.authenticate('admin'), (req, res) => {
  res.json(req.user);
});

router.post('/api/signup', (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      // res.status(200).send(
      //   {
      //     message: 'The user has been signed up successfully',
      //   },
      // );
      res.redirect('/login');
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Route for getting some data about our user to be used client side
router.get('/api/user_data', (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({ message: false });
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      message: true,
    });
  }
});

module.exports = router;
