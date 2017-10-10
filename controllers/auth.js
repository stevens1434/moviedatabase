var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var userId;
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/profile', //if login successful - redirect to root
        successFlash: 'Account created and logged in' //FLASH
      })(req, res);
    } else {
      req.flash('error', 'Email already exists');  //FLASH
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile', //if successful w/ login - direct to profile (but I will eventually route to home)
  failureRedirect: '/auth/login', //if not successful w/ login - redirect to login page
  failureFlash: 'Invalid username and/or password', //FLASH
  successFlash: 'You have logged in' //FLASH
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out'); //FLASH
  res.redirect('/');
});

router.get('/edit', isLoggedIn, function(req, res) {
  res.render('auth/edit');
});

router.get('/delete', function(req, res) {
  res.render('auth/delete', {});
});

router.post('/deleteconfirm', function(req, res) {
  db.user.destroy({
    where: {
      id: req.users
    }
  }).then(function() {
    console.log(req.user.dataValues.UserId);
    res.render('auth/deleteconfirm' );
  });

})

module.exports = router;
