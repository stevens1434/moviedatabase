var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  // find or create a user, providing the name and password as default values
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      // replace the contents of this if statement with the code below -- done
      passport.authenticate('local', {
        successRedirect: '/', //if login successful - redirect to root
        successFlash: 'Account created and logged in' //FLASH
      })(req, res);
    } else {
      // if not created, the email already exists
      req.flash('error', 'Email already exists');  //FLASH
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // FLASH
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home', //if successful w/ login - direct to profile (but I will eventually route to home)
  failureRedirect: '/auth/login', //if not successful w/ login - redirect to login page
  failureFlash: 'Invalid username and/or password', //FLASH
  successFlash: 'You have logged in' //FLASH
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out'); //FLASH
  res.redirect('/');
});

// router.get('/home', function(req, res) {
//   res.render('results');
// });

// router.get('/results', function(req, res) {
//   db.movies.find();
//   res.render('results');
// });


// router.get('/results', function(req, res) { // display a specific movie //DO I NEED TO USE JSON?
//   db.movies.find( {
//     where: { name: req.body.name }
//   }).then(function(movie) {
//
//     console.log(movie);
//     res.render('results', { movie: movie });
//   });
// });

// router.post('/home', function(req, res) {
//   db.movie.find(
//   }).then(function(movies){
//     res.render('results', { movies: movies});
//   });
// });

module.exports = router;
