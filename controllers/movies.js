var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');

router.get('/results', function(req, res) {
  db.movie.findOne( {
    where: { name: req.body.text }
  }).then(function(movie) {
    res.render('results', { movie: movie });
    console.log("__________________________", movie);
  });
});



module.exports = router;
