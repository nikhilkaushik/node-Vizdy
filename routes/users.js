var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/*
router.post('/register', function(req,res){
    console.log("**********In Post register");
    var collection = req.db.get('users');
    collection.insert({
        username : req.body.username,
        passport: req.body.password
    }, function(err, newuser){
            if (err) throw err;
           /* passport.authenticate('local', (req, res, function(){
                res.redirect('/');
            }));*/
        /*    console.log("before auth");
            passport.authenticate('local', {successRedirect: '/', failureRedirect: '/register', failureFlash:true});
            });
            console.log("after auth");
});
*/

router.get('/login', function(req,res){
       // console.log(req.flash('error')[0]);
        return res.render('login',{error : req.flash('error')[0]});
});

router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
});

router.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                   failureRedirect: '/login',
                                                   failureFlash: true
                                                   }));


module.exports = router;
