const router = require('express').Router();

const db = require('../models');

router.get('/', (req, res) => res.json('Sample API get endpoint'));

// $.ajax("/api/books", {type: 'POST', data: bookObj}).then((response)=>{
// create book via object
// adds book to Book model, adds bookid and categoryid to BookCategory model

router.post('/api/books', (req, res) => {
  console.log(req.body);
  db.Book.create(req.body, {})
    .then((dbBook) => {
      console.log(dbBook);
      dbBook.setCategories(req.body.categories);
      res.status(200).json(dbBook);
    })
    .catch((err) => {
      res.status(401).json({ message: false });
      console.log(err);
    });
});

module.exports = router;
