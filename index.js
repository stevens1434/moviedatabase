require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var path = require('path');
var request = require('request');
var db = require('./models');
var async = require('async');
// var cookieSession = require('cookie-session');
var app = express();

var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ejsLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

var passport = require('./config/ppConfig');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/404', function(req, res) {
  res.render('main/404');
})

app.get('/search', function(req, res) {
  db.movie.findAll( { //TRYING TO PASS USER INFO IN
    order: [["name", "ASC"]]
  }).then(function(movie) {
    res.render('search', {movie: movie});
  });
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/movies', require('./controllers/movies'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
