const router = require('express').Router();

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
