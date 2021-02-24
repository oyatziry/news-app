const express = require("express")
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require("../models")


router.get('/', isLoggedIn, (req, res) => {
    res.render('profile');
});

module.exports = router;