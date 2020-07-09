const router = require('express').Router();

// const { Op } = require('sequelize');

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

// return all book table data of a specific book
// get /api/books/:id
router.get('/api/book/:id', (req, res) => {
  db.Book.findOne({
    where: { id: req.params.id },
  }).then((dbbooks) => {
    res.json(dbbooks);
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
// router.get('/api/search/:searchparams', (req, res) => {
//   const lookupValue = req.params.searchparams;
//   db.Book.findAll({
//     where: {
//       [Op.or]: [
//         {
//           title: {
//             [Op.like]: `%${lookupValue}%`,
//           },
//           added: true,
//         },
//         {
//           author: {
//             [Op.like]: `%${lookupValue}%`,
//           },
//           added: true,
//         },
//         {
//           illustrator: {
//             [Op.like]: `%${lookupValue}%`,
//           },
//           added: true,
//         },
//       ],
//     },
//   }).then((dbSearchResult) => {
//     res.json(dbSearchResult);
//   });
// });

module.exports = router;
