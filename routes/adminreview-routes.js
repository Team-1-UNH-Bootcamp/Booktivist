const router = require('express').Router();

const db = require('../models');

router.get('/', (req, res) => res.json('Sample API get endpoint'));

// return all books with added = false

router.get('/api/admin/books', (req, res) => {
  db.Book.findAll({
    where: { added: false },
  }).then((dbBooksNotApproved) => {
    res.json(dbBooksNotApproved);
  });
});

// get clicked book from books table based on book id

router.get('/api/book/:bookId', (req, res) => {
  db.Book.findOne({
    // raw: true,
    where: { id: req.params.bookId },
  }).then((dbBook) => {
    res.json(dbBook);
  });
});

// $.ajax("/api/admin/books/${id}", { type: "POST"}
// set value of added for this book id to true

router.put('/api/admin/books/:bookId', (req, res) => {
  console.log(req.body.added);
  db.Book.update(
    { added: req.body.added },
    { where: { id: req.params.bookId } },
  ).then((dbBooks) => {
    res.json(dbBooks);
  });
});

// $.ajax("/api/admin/books/${id}", { type: "DESTROY"}
// DESTROY book by id
// TODO: will need to delete the corresponding BookCategory Table entry at this point

router.delete('/api/admin/books/:id', (req, res) => {
  db.Book.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.json({ message: 'user deleted successfully' });
  });
});

module.exports = router;
