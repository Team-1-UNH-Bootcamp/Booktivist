const router = require('express').Router();

const db = require('../models');

router.get('/', (req, res) => res.json('Sample API get endpoint'));

// $.ajax("/api/books", {type: 'POST', data: bookObj}).then((response)=>{
// create book via object

router.post('/api/books', (req, res) => {
  db.Book.create(req.body).then(() => {
    res.json({ message: 'Book added successfully' });
  });
});

module.exports = router;
