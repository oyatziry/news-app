const express = require("express")
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require("../models")

// GET - user info
router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({
        where : {
            id : req.user.id
        }
    }).then((user) => {
        res.render('profile', { user : user});
    })
});

// DELETE - /user/:id 
router.delete('/:id', isLoggedIn, (req, res) => {
    db.usersArticles.destroy({
      where: { userId: req.params.id },
      include:[db.article]
    }).then((deletedArticle) => {
      db.user.destroy({
        where: { id: req.user.id }
      }).then((deleted) => {
        res.redirect('/');
      })
    }).catch((error) => {
      res.status(400).render('404');
    })
})

//GET - /edit/:id - get user info when click on edit
router.get('/edit/:id', function(req, res){
    db.user.findOne({
      where: {
        id : req.params.id
      }
    }).then(function(user){
      res.render('edit', {user: user});
    })
});

// PUT - /:id - takes updated info to post when user updates their profile 
router.put('/:id', (req,res) => {
    db.user.update(
      { name : req.body.name,
        email : req.body.email,
      },
      { where: {id: req.user.id}}
    ).then(
      res.redirect('/profile')
    )
})

module.exports = router;
