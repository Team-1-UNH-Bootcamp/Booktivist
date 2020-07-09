const router = require('express').Router();
// const db = require('../models');
const passport = require('../config/passport');
// const isAdmin = require('../config/middleware/isAdmin');

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post('/api/admin/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
  // console.log(req.user);
});

module.exports = router;
