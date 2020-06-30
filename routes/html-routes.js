const path = require('path');
const router = require('express').Router();

// home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// route to login page
router.get('/login', (req, res) => {
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
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// for admin login
router.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// for admin review user book submissions
router.get('/admin/review', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
