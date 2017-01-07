var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

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
