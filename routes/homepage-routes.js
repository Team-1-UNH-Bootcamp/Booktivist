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
// get /api/search/:searchparams (author, title, illustrator, or categories)
// return all books that fit the req.parms.search
// THIS WORKS PERFECTLY FOR QUERYING BOOK TABLE COLUMNS (NEED TO ALSO QUERY BY
// CATEGORY and return BOOKS)
// I think ultimately that I'll need to bring in the category from the Category
// model into the Books model
router.get('/api/search/:searchparams', (req, res) => {
  const lookupValue = req.params.searchparams;
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

// Black Lives Matter+ books displayed on the homepage
// get /api/books/category/:categoryid
// return all books marked BLM
// the result is an array of objects by Category Model (all column data), Book Model (books) with
// only specified columns row data, and BookCategory Model (all column data)
// will pull against value entered on end and return accordingly
// ':categoryid' will need to be hardcoded as the id that BLM has on the Category table
// currently with mock data in db the Category id for Black Lives Matter = 3
// router.get('/api/books/category/3', (req, res) => {
//   db.Category.findAll({
//     raw: true,
//     where: { id: 3 },
//     include: [
//       {
//         model: db.Book,
//         where: { added: true },
//         as: 'books',
//         attributes: ['id', 'title', 'author', 'image_link', 'description'],
//       },
//     ],
//   }).then((dbBookBLM) => {
//     res.json(dbBookBLM);
//   });
// });

// LGBTQIA+ books displayed on the homepage
// get /api/books/category/:categoryid
// return all books marked LGBTQIA
// router.get('/api/books/category/1', (req, res) => {
//   db.Category.findAll({
//     raw: true,
//     where: { id: 1 },
//     include: [
//       {
//         model: db.Book,
//         where: { added: true },
//         as: 'books',
//         attributes: ['id', 'title', 'author', 'image_link', 'description'],
//       },
//     ],
//   }).then((dbBookLGBTQ) => {
//     res.json(dbBookLGBTQ);
//   });
// });

// Native American Heritge books displayed on the homepage
// get /api/books/category/:categoryid
// return all books marked NAH
// router.get('/api/books/category/2', (req, res) => {
//   db.Category.findAll({
//     raw: true,
//     where: { id: 2 },
//     include: [
//       {
//         model: db.Book,
//         where: { added: true },
//         as: 'books',
//         attributes: ['id', 'title', 'author', 'image_link', 'description'],
//       },
//     ],
//   }).then((dbBookNAH) => {
//     res.json(dbBookNAH);
//   });
// });
