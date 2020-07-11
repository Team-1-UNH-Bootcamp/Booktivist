const router = require('express').Router();
const db = require('../models');

router.get('/mylibrary', (req, res) => {
  db.Book.findAll({
    include: [
      {
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
      },
    ],
  })
    .then((dbBooks) => {
      res.status(200).json(dbBooks);
    })
    .catch((err) => {
      res
        .status(401)
        .json(err)
        .send(false);
    });
});

router.get('/mylibrary/:id', (req, res) => {
  db.Book.findOne({
    include: [
      {
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
          where: {
            bookId: req.params.id,
          },
        },
      },
    ],
  })
    .then((dbBooks) => {
      res.status(200).json(dbBooks);
    })
    .catch((err) => {
      res.status(401).json({ message: false });
      console.log(err);
    });
});

router.post('/mylibrary/:id', (req, res) => {
  db.UserBooks.create({
    userId: req.user.id,
    bookId: req.params.id,
  })
    .then((dbUserBook) => {
      res.json(dbUserBook);
    })
    .catch((err) => {
      res.status(401).json(err);
      console.log(err);
    });
});

router.delete('/mylibrary/:id', (req, res) => {
  db.UserBooks.destroy({
    where: { userId: req.user.id, bookId: req.params.id },
  })
    .then((dbUserBook) => {
      res.json(dbUserBook);
    })
    .catch((err) => {
      res.status(401).json(err);
      console.log(err);
    });
});
router.get('/mylibrary/:id', (req, res) => {
  db.Book.findOne({
    where: {
      bookId: req.params.id,
    },
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
    .then((dbBook) => {
      res.status(200).json(dbBook);
    }).catch((err) => {
      res.status(401).json(err);
    });
});
module.exports = router;
