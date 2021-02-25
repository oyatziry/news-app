const express = require("express")
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require("../models")

router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{
            id: req.user.id
        },
        include : [db.article]
    }).then((user)=>{
            res.render('bookmarks/saved', { articles: user.articles, user:user})
    }).catch((error)=>{
        res.status(400).render('404')
    })
});

router.post('/', isLoggedIn, (req,res) => {
    db.user.findOrCreate({
        where: {
            id : parseInt(req.user.id)
        }
    }).then(([returnedUser,created]) => {
        db.article.findOrCreate({
            where:{
                title: req.body.title
            },
            defaults: {
                source: req.body.source,
                date: req.body.date,
                articleLink: req.body.articleLink,
                image: req.body.image,
                author: req.body.author,
                description:req.body.description,
            }
        }).then(([bookmarked,created])=>{
            console.log("-------------------")
            console.log(bookmarked.dataValues.id)
            console.log("-------------------")
            returnedUser.addArticle(bookmarked.dataValues.id).then(()=>{
                res.redirect('/bookmarks')
            })
            // console.log("-------------------")
            // console.log(bookmarked)
            // console.log("-------------------")
        }).catch((error)=>{
            res.status(400).render('404')
        })
    })
})

module.exports = router;