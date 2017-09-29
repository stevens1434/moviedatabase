var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');

//ToDo:   findAll()
//        search more than just db.movies (such as db. genere/actors/,etc)
//
router.post('/results', function(req, res) {
  db.movie.findOne( {
    where: { name: req.body.name }
  }).then(function(movie) {
    res.render('results', { movie: movie });
  }).catch(function(error) {
    console.log('_________________________________________', res.status);
    res.status(400).render('main/404');
  });
});



module.exports = router;
