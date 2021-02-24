const express = require("express")
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require("../models")


router.get('/', isLoggedIn, (req, res) => {
    db.article.findAll()
    .then((newsData) => {
      res.render('bookmarks/saved', { articles: newsData });
    })
});

module.exports = router;