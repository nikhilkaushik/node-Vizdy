var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});


router.post('/register', function(req,res){                                                                       
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    // Grab user fields.
    if (!username || !password || !email) {
            return res.render('register', { title: 'Register', error: 'All fields are required.' });
     }
    var collection = req.db.get('users');
    collection.insert({
        username : username,
        password : password,
        email : email    
    },function(err, createduser){
            if(err) return res.render('register',{ title: 'Register', error : err.userMessage});
/*            passport.authenticate('local', (req,res,function(){
                return res.redirect('/');
            }));*/
            return res.redirect('/login');
    });
    
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
