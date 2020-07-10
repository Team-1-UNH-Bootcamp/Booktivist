const path = require('path');
const router = require('express').Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isAdmin = require('../config/middleware/isAdmin');

// home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// route to login page - see below-working
// If the user already has an account send them to the mylibrary page
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/mylibrary');
  }
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// route to signup page,working
router.get('/signup', (req, res) => {
  // If the user already has an account send them to the mylibrary page
  if (req.user) {
    res.redirect('/mylibrary');
  }
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

// route to about page
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
});

// route to category page
router.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/categories.html'));
});

// route to my library - see below, working
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they
// will be redirected to the signup page

// get all the books for logged in user
router.get('/mylibrary', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/mylibrary.html'));
});

// user is redirected to addbook page if the user is loggedin
router.get('/addbook', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/addbook.html'));
});

router.get('/admin/login', (req, res) => {
  if ((req.user) && (req.user.adminStatus === true)) {
    res.redirect('/admin_review');
  }
  res.sendFile(path.join(__dirname, '../public/admin_login.html'));
});

router.get('/admin/review', isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin_review.html'));
});


module.exports = router;
