require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();

var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(ejsLayouts);

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
  resave: false,
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
});

app.get('/home', function(req, res) {
  res.render('home');
})

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/home', require('./controllers/auth'));
app.use('/results', require('./controllers/auth'));
app.use('/home/results', require('./controllers/auth'));

app.use('/auth', require('./controllers/movies'));
app.use('/movies', require('./controllers/movies'));
app.use('/movies', require('./controllers/movies'));
app.use('/movies/results', require('./controllers/movies'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
