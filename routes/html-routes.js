const path = require('path');
const router = require('express').Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// route to login page - see below
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  }
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// route to signup page
router.get('/signup', (req, res) => {
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

// route to my library - see below
// router.get('/mylibrary', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/mylibrary.html'));
// });

// route to my add book
// router.get('/addbook', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/addbook.html'));
// });

// for admin login
router.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin_login.html'));
});

// for admin review user book submissions - see below
// router.get('/admin/review', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/admin_review.html'));
// });

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = (app) => {
  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('../public/index.html');
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they
  // will be redirected to the signup page
  app.get('/mylibrary', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mylibrary.html'));
  });
  app.get('/adbook', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/addbook.html'));
  });
  app.get('/admin/review', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/addmin_review.html'));
  });
};

module.exports = router;
