const router = require('express').Router();
const db = require('../models');
const passport = require('../config/passport');


router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

// signup user
router.post('/api/signup', (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, '/api/login');
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});


module.exports = router;
