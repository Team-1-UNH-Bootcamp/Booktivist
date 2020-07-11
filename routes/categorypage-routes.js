const router = require('express').Router();

const db = require('../models');

router.get('/', (req, res) => res.json('Sample API get endpoint'));

// category dropdown on home page
// categories - load from the categories.html (onload)
// get /api/categories/:category
// return all books fitting category from req.params.category
router.get('/api/categories/:category', (req, res) => {
  db.Category.findAll({
    raw: true,
    where: { category: req.params.category },
    include: [
      {
        model: db.Book,
        where: { added: true },
        as: 'books',
        attributes: [
          'id',
          'title',
          'author',
          'image_link',
          'pub_date',
          'description',
        ],
      },
    ],
  }).then((dbBookCategory) => {
    res.json(dbBookCategory);
  });
});

// return all book table data of a specific book
// get /api/books/:id
router.get('/api/book/:id', (req, res) => {
  db.Book.findOne({
    where: { id: req.params.id },
  }).then((dbbooks) => {
    res.json(dbbooks);
  });
});

module.exports = router;
