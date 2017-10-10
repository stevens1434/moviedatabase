var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var omdb = require('omdb');

var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/isLoggedIn');
var async = require('async');

var dbAndApi = {};
var imdbResults = [];
var imdbPoster = [];
var ids = [];

var iterateThroughMovies = function(callback){
  for (var j = 0; j < 6; j++) {
      getMovieDetails(j, function(data){
        imdbResults.unshift(data);
      });
      callback(imdbResults);
  };
}
var getMovieDetails = function(j, callback){
    request('https://theimdbapi.org/api/movie?movie_id=' + ids[j] + "&zzz=123", function(error, response, body) {
      var data = JSON.parse(body);
      callback(data);
    });
}
router.post('/results', function(req, res) {
    var ombdData = function(callback) {
      request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
        var data = JSON.parse(body);
        var movieList = data.Search;
        imdbPoster = [];
        for (var p = 0; p < 6; p++) {
          imdbPoster.push(movieList[p].Poster);
        }
        ids = [];
        for (var i = 0; i < 6; i++) {
          ids.unshift(movieList[i].imdbID); // add OMDB movie ID's to ids array
        }
        var omdbFinal = callback;
        dbAndApi.omdbFinal = omdbFinal; //May be uneccesary
        callback(null, movieList);
      });
    }
    var imdbData = function(callback) {
      iterateThroughMovies(function(x) {
      });

      setTimeout(function() {
        callback(null, imdbResults);
      }, 2500);
    }
    var dbData = function(callback) {
      db.movie.findOne( {
        where: { name: req.body.name }
      }).then(function(movie) {
        var dbFinal = callback;
        dbAndApi.dbFinal = dbFinal;
        callback(null, movie);
      });
    }
      async.series([ombdData, imdbData, dbData], function(err, results) {
        console.log("_________ids: ", ids);
            res.render('movies/results', {results: results});
      });
})

router.get('/add', function(req, res) {
  res.render('movies/add');
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
    // console.log("______movie in movies/:id GET route", movie);
    res.render('movies/movieid', {movie: movie });
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});


router.delete('/:id', function(req, res) {
  db.movie.destroy( {
    where: { id: req.params.id }
  }).then(function(data) {
    console.log("_________ data delete in controllers/movies.js: ", data);
    // res.redirect("/search");
    res.render('search');
   });
});

router.put('/:id/:name', function(req, res) {
  db.movie.update(
    { name: req.params.name },
    { where: { id: req.params.id },
    include: [db.movie]
  }).then(function(movie) {
    console.log("put (edit) AJAX______________", movie);
    res.render('movies/movieid', {movie: movie });
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});

router.post('/', isLoggedIn, function(req, res) {
  db.movie.create({
    name: req.body.name
  }).then(function(data) {
    res.redirect('/movies');
  });
});

module.exports = router;
