require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var $ = require('jQuery')
var path = require('path');
var request = require('request');
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
// app.use(methodOverride('_method'))

  /*
   * setup the session with the following:
   *
   * secret: A string used to "sign" the session ID cookie, which makes it unique
   * from application to application. We'll hide this in the environment
   *
   * resave: Save the session even if it wasn't modified. We'll set this to false
   *
   * saveUninitialized: If a session is new, but hasn't been changed, save it.
   * We'll set this to true.
   */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

 // * Include the flash module by calling it within app.use().
 // * IMPORTANT: This MUST go after the session module
app.use(flash());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//the WDI instructions say to do this at the top but DO NOT!
var passport = require('./config/ppConfig');
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/search', isLoggedIn, function(req, res) {
  // db.user.find( { //TRYING TO PASS USER INFO IN
  //   where: { name: req.body.name }
  // }).then(function(user) {
    // res.render('search', {user: user});
  // })
  res.render('search');
})

app.get('/profile', isLoggedIn, function(req, res) {
  // db.user.find( {
  //   where: { id: req.params.id }
  // }).then(function(movie) {
  //   // console.log("______movie", movie);
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/movies', require('./controllers/movies'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
