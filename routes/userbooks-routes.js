const router = require('express').Router();
const db = require('../models');

// add UserBooks
// router.post('/userbooks', (req, res) => {
//   db.UserBooks.create(req.body).then((dbUserBook) => {
//     res.json(dbUserBook);
//   });
// });

// GET /api/mylibrary/:userid/:bookid
// return if book id is in row matching userid

router.get('/userbooks/:id', (req, res) => {
  db.Book.findOne({
    where: {
      id: req.params.id,
    },

    include: [{
      model: db.User,
      as: 'users',
      attributes: ['id', 'firstName', 'lastName'],
      through: {
        // This block of code allows you to retrieve the properties of the join table
        model: db.UserBooks,
        as: 'userBooks',
        attributes: ['bookId'],
      },
    }],
  })
    .then((dbUserBook) => {
      res.json(dbUserBook);
      // res.redirect('/mylibrary');
      console.log(dbUserBook);
    });
});


// first time adding book in wishlist or userBooks
// click on (+) sign and book will be added to userBooks table (we need to pass userid and bookId)
router.post('/mylibrary/', (req, res) => {
  db.UserBooks.create({
    bookId: req.body.bookId,
    userId: req.user.Id,
  }).then((dbUserBook) => {
    req.flash('success', 'The book has been added successfully');
    res.json(dbUserBook);
  }).catch((err) => {
    req.flash('error', 'Please login first');
    res.redirect('/login');
    res.status(401).json(err);
  });
});


module.exports = router;
