const router = require('express').Router();
const db = require('../models');

router.get('/mylibrary', (req, res) => {
  db.Book.findAll({
    include: [{
      model: db.User,
      as: 'users',
      where: {
        id: req.user.id,
      },
      attributes: ['id', 'firstName', 'lastName'],
      through: {
        model: db.UserBooks,
        as: 'userBooks',
        attributes: ['bookId'],
      },
    }],
  })
    .then((dbBooks) => {
      res.status(200).json(dbBooks);
    }).catch((err) => {
      res.status(401).json(err);
    });
});

router.post('/mylibrary/:id', (req, res) => {
  db.UserBooks.create({
    userId: req.user.id,
    bookId: req.params.Id,
  }).then((dbUserBook) => {
    res.json(dbUserBook);
  }).catch((err) => {
    res.status(401).json(err);
  });
});

module.exports = router;
