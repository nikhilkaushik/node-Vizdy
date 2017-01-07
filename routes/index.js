var express = require('express');
var router = express.Router();


function ensureAuthenticated(req, res, next){
     console.log("in ensure Auth");   
     if(req.isAuthenticated()) { console.log("After isAuth" + req.user.username); return next();}
       console.log("Not logged in");
       res.redirect('/login');
 };
 
 
/* GET home page. */
router.get('/', ensureAuthenticated, function(req,res){                                                                       
        console.log("In / ensure auth ");
        return res.render('index', {user: req.user});
});

module.exports = router;
