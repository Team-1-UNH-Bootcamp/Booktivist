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

// this will return all the books
// router.get('/', function (req, res) {
//   connection.query('select * from book', (err, result) => {
//     if (err) throw err;

//     result.forEach((row) => {
//       console.log(row.title);
//     })
//     console.log(result);
//   })
// });


// GET /api/books/:bookid
// return information from books table to populate book modal
// router.get('/api/books/:bookId', function (req, res) {

//   connection.query('select * from book where bookId=?', [req.params.bookId], (err, result) => {
//     if (err) throw err;

//     result.forEach((row) => {
//       console.log(row.title);
//     })
//     console.log(result);
//   })

// });


// GET /api/mylibrary/:userid/:bookid
// return if book id is in row matching userid

// router.get('/api/mylibrary', (req, res) => {
//  connection.query('select * from wishlist', (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })

// });

// router.get('/api/mylibrary/:userId', function (req, res) {
//  connection.query('select * from wishlist where userId=?',
// [req.params.userId], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
//   return res.send('No books found');
// });


// if user click on plus sign (+) to add a book into
// the mylibrary, check if user is logged in or not
// if not redirect to signup page or login page
// if yes then book will be added to user's my library.

// router.post('/api/mylibrary/', function (req, res) {

//  connection.query('insert into wishlist (??)
// where userId=?', [req.params.userId], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
//   return res.send('No books found');
// });

// router.get('/', (req, res) => res.json('Sample API get endpoint'));

// for book modal

// GET /api/books/:bookid
// return information from books table to populate book modal

// GET /api/mylibrary/:userid/:bookid
// return if book id is in row matching userid

// if user has not already added book
// POST /api/mylibrary/:userid/:bookid
// add book id to table were req.params.userid = userid

// if user has added book
// DESTROY /api/mylibrary/:userid/:bookid
// delete book id from library where = userid

module.exports = router;
