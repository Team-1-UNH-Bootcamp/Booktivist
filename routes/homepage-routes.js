const router = require('express').Router();

const { Op } = require('sequelize');

const db = require('../models');

router.get('/', (req, res) => res.json('Sample API get endpoint'));

// category dropdown on home bage
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

// search bar
// categories.html (onload) categories?search
// get /api/search/:searchparams (author, title, illustrator)
// return all books that fit the req.parms.search
router.get('/api/search/:searchparams', (req, res) => {
  const request = req.params.searchparams;
  const lookupValue = request.replace(/&/g, ' ');
  db.Book.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${lookupValue}%`,
          },
          added: true,
        },
        {
          author: {
            [Op.like]: `%${lookupValue}%`,
          },
          added: true,
        },
        {
          illustrator: {
            [Op.like]: `%${lookupValue}%`,
          },
          added: true,
        },
      ],
    },
  }).then((dbSearchResult) => {
    res.json(dbSearchResult);
  });
});

// recently published books displayed on the homepage
// get /api/books/recent
// TODO return recently published books TBD
router.get('/api/books/recent', (req, res) => {
  db.Book.findAll({
    where: { added: true },
    order: [['pub_date', 'DESC']],
    attributes: [
      'id',
      'title',
      'author',
      'image_link',
      'pub_date',
      'description',
    ],
  }).then((dbBookRecent) => {
    res.json(dbBookRecent);
  });
});

// Native American Heritge books displayed on the homepage
// LGBTQIA+ books displayed on the homepage
// Black Lives Matter+ books displayed on the homepage
// get /api/books/category/:categoryid
router.get('/api/books/category/:id', (req, res) => {
  db.Category.findAll({
    raw: true,
    where: { id: req.params.id },
    include: [
      {
        model: db.Book,
        where: { added: true },
        as: 'books',
        attributes: ['id', 'title', 'author', 'image_link', 'description'],
      },
    ],
  }).then((dbBooks) => {
    res.json(dbBooks);
  });
});

// return all book table data of a specific book
// this if for the modal
// get /api/books/:id
router.get('/api/book/:id', (req, res) => {
  db.Book.findOne({
    where: { id: req.params.id },
  }).then((dbBook) => {
    res.json(dbBook);
  });
});

module.exports = router;
