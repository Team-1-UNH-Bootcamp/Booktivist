const router = require('express').Router();
const db = require('../models');


// this will create users
// router.post('/api/users', (req, res) => {
//   db.User.create(req.body).then((dbUser) => {
//     console.log(res);
//     res.json(dbUser);
//   });
// });

// add categories
router.post('/api/categories', (req, res) => {
  db.Category.create(req.body).then((dbCat) => {
    res.json(dbCat);
  });
});

// add books
router.post('/api/books', (req, res) => {
  db.Book.create(req.body).then((dbBook) => {
    res.json(dbBook);
  });
});

// add UserBooks
router.post('/api/userbooks', (req, res) => {
  db.UserBooks.create(req.body).then((dbUserBook) => {
    res.json(dbUserBook);
  });
});

// GET /api/mylibrary/:userid/:bookid
// return if book id is in row matching userid


router.get('/api/userbooks/', (req, res) => {
  db.Book.findAll({
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
router.get('/api/userbooks/:id', (req, res) => {
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
router.post('/api/userbooks/', (req, res) => {
  db.UserBooks.create(req.body)
    .then((dbUserBook) => {
      res.json(dbUserBook);
      console.log(dbUserBook);
    });
});


module.exports = router;
