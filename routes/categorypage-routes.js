const router = require('express').Router();

router.get('/', (req, res) => res.json('Sample API get endpoint'));

// category dropdown on home bage
// categories - load from the categories.html (onload)
// get /api/categories/:category
// return all books fitting category from req.params.category

// search bar
// categories.html (onload) categories?search
// get /api/search/:searchparams (author, title, illustrator, or categories)
// return all books that fit the req.parms.search

module.exports = router;
