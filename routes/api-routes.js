const router = require('express').Router();
// const db = require('../models');
// const passport = require('../config/passport');


// router.post('/api/login', passport.authenticate('local'), (req, res) => {
//   res.json(req.user);
// });


// if user click on plus sign (+) to add a book into
// the mylibrary, check if user is logged in or not
// if not redirect to signup page or login page
// if yes then book will be added to user's my library.

// router.post('/api/mylibrary/:bookid', function (req, res) {


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
