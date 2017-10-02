var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');
var session = require('express-session');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override')
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var userId;

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
        successRedirect: '/profile', //if login successful - redirect to root
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

router.get('/edit', function(req, res) {
  res.render('auth/edit');
});
//
// router.put('/edit', function(req, res) {
//   $('.put-form').on('editSubmit', function(e) {
//     e.preventDefault();
//     $.ajax({
//       method: 'PUT',
//       email: user.email,
//       name: user.name,
//       password: user.password
//     }).done(function(data) {
//       // get data returned from the PUT route
//       console.log(data);
//
//       //
//       // do stuff when the PUT action is complete
//       // teamElement.remove();
//       //
//       // or, you can redirect to another page
//       // window.location = '/profile';
//       res.redirect('/profile');
//     });
//   }); res.redirect('/profile');
// });

router.get('/delete', function(req, res) {
  res.render('auth/delete', {});
});

router.post('/deleteconfirm', function(req, res) {
  // console.log(req.user);
  db.user.destroy({
    where: {
      id: req.users
    }
  }).then(function() {
    console.log(req.user.dataValues.UserId);
    // req.logout();
    // req.flash('success', 'You have deleted your account.'); //FLASH
    res.render('auth/deleteconfirm' );
  });

})

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// }, function(email, password, cb) {
//   db.user.find({
//     where: { email: email }
//   }).then(function(user) {
//     if (!user || !user.validPassword(password)) {
//       cb(null, false);
//     } else {
//       cb(null, user);
//     }
//   }).catch(cb);
// }));
// router.post('/auth/delete', function(req, res) {
//
//   console.log("_____________________");
//   db.user.destroy({
//     where: {
//       email: req.body.email,
//       name: req.body.name,
//       password: req.body.password
//     }
//   }).then(function() {
//     console.log("DELETE ACCOUNT PLEASE");
//     // req.logout();
//     req.flash('success', 'You have deleted your account.'); //FLASH
//     res.render('auth/deleteconfirm');
//   });
//
// });

module.exports = router;
