var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var monk = require('monk');
var db = monk('localhost:27017/vidzy');

var routes = require('./routes/index');
var users = require('./routes/users');
var videos = require('./routes/videos');

var session = require('express-session');
var flash = require('connect-flash');
//var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret :'test secret', cookie: {maxAge: 60000},resave: true, saveUninitialized: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Make the db accessible to our router
app.use(function(req,res,next){
        req.db = db;
        next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/api/videos', videos);

var Users = db.get('users');

passport.use(new LocalStrategy(function(username, password, done){
    Users.findOne({ username : username}, function(err,user) {
        if(err) {return done(err); }
        if(!user) {
            console.log("invalid user");    
            return done(null, false, {message : 'Incorrect username'});
        }
        if (password == user.password){
            console.log(" Pwd matches ");
            return done(null, user);
        }else {
            done(null, false, {message: 'Incorrect password' });
        }
    });    
}));

passport.serializeUser(function(user,done){
        console.log("In serialize user"+user.username);
        done(null, user);
});

passport.deserializeUser(function(user,done){
        console.log("deserialize "+user.username);
        done(null, user);
});

app.get('/login', function(req,res){
        return res.render('login');
});

app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
});

app.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                   failureRedirect: '/login',
                                                   failureFlash: true
                                                   }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//module.exports = routes;
module.exports = app;
