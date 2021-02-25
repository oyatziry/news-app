const express = require("express")
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require("../models")


router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({
        where : {
            id : req.user.id
        }
    }).then((user) => {
        res.render('profile', { user : user});
    })
});

// delete
router.delete('/:id',function(req,res){
    db.user.destroy({
      where: {id: req.user.id}
    }).then(function(deleated){
      res.redirect('/')
    })
})

module.exports = router;