var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var omdb = require('omdb');
var $ = require('jQuery');

//ToDo:   findAll() - get list of movies
//        search more than just db.movies (such as db. genere/actors/,etc)
//        searchOrCreate() - offer to create new movie and somehow add to DB as well as redirect to a page to download the movie torrent
// Search doing "like", google: "how to do like in sequelize"

var dbAndApi = {};
router.post('/results', function(req, res) {
  request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
    var data = JSON.parse(body);
    var movieList = data.Search;
    dbAndApi.movieList = movieList;
    db.movie.findOne( {
      where: { name: req.body.name }
      // order: [["name", "ASC"]]
    }).then(function(movie) {
      // console.log("______dbAndApi", dbAndApi.movieList);
      dbAndApi.movie = movie;
      res.render('movies/results', {dbAndApi: dbAndApi });
    }).catch(function(error) {
      // console.log('_________________________________________', res.status);
      res.status(400).render('main/404'); //ToDO: make 404 page work
    });
  });
});


router.get('/', function(req, res) {
  db.movie.findAll( {
    order: [["name", "ASC"]]
  }).then(function(movie) {
    // console.log("______movie[1].id_____", movie[1].id);
    res.render('movies/movies', {movie: movie });
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});

router.get('/:id', function(req, res) {
  db.movie.find( {
    where: { id: req.params.id }
  }).then(function(movie) {
    // console.log("______movie", movie);
    res.render('movies/movieid', {movie: movie });
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});

//ToDo: make this redirect to a real page
router.delete('/:id', (req, res) => {
  db.movie.destroy( {
    where: { id: req.params.id }
  }).then(function() {
    console.log("_________delete in controllers/movies.js")
    res.redirect('/movies');
  });
});

router.get('/:id/edit', function(req, res) {
  db.movie.findOne( {
    where: { id: req.params.id }
  }).then(function(movie) {
    console.log("______movie.name in EDIT", movie.name);
    res.render('movies/edit', {movie: movie });
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});

router.put('/:id/edit', (req, res) => {
  db.movie.put( {
    where: { id: req.body.id }
  }).then(function() {
    console.log("_________put(edit) in controllers/movies.js")
    res.redirect('/:id');
  });
});





module.exports = router;
