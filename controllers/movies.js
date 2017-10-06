var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var omdb = require('omdb');
var $ = require('jQuery');

var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/isLoggedIn');

//ToDo:   findAll() - get list of movies
//        search more than just db.movies (such as db. genere/actors/,etc)
//        searchOrCreate() - offer to create new movie and somehow add to DB as well as redirect to a page to download the movie torrent
// Search doing "like", google: "how to do like in sequelize"

// var api = require(../../.env);
//
// process.env.SESSION_SECRET
// console.log("______ api key: ",process.env.API_KEY);
var dbAndApi = {};
var imdbResults = [];                                  //2fb112ab
  var ids = [];

var iterateThroughMovies = function(callback){
  // console.log("iterateThroughMovies ___________");
  for (var j = 0; j < 6; j++) {
    // imdbResults.push(getMovieDetails(j));
    getMovieDetails(j, function(data){
      // console.log("__________ data: ", data);
      imdbResults.push(data)
    })

      callback(imdbResults)

  };
// console.log("______ imdbResults: ", imdbResults);
}

var getMovieDetails = function(j, callback){
  console.log("getMovieDetails_______________")
    request('https://theimdbapi.org/api/movie?movie_id=' + ids[j], function(error, response, body) {
      var imdbDetails = JSON.parse(body);
      // console.log("_________imdbDetails: ", imdbDetails);
      // imdbResults.push(imdbDetails);
      // console.log("____________ imdbID: ", dbAndApi.imdbID);
      callback(imdbDetails)
    });
}

router.post('/results', function(req, res) {          //process.env.API_KEY
  request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
    var data = JSON.parse(body);
    var movieList = data.Search;
    dbAndApi.movieList = movieList;
                // console.log("______ movieList", movieList);
                // console.log("______ dbAndApi w/ movieList: ",dbAndApi);
    for (var i = 0; i < 6; i++) {
      ids.push(movieList[i].imdbID);
    };
                // console.log("______ ids: ", ids);
                // console.log("_______ IMDB ID: ", dbAndApi.movieList[0].imdbID);
    // var imdbResults = [];
    iterateThroughMovies( function(x) {
      // console.log("iterateThroughMovies 1 __________")
      // console.log("______________imdbmovieresults");
      dbAndApi.imdbResults = imdbResults
    })
    // for (var j = 0; j < 6; j++) {
    //   imdbResults.push(getMovieDetails(j));
    //   // request('https://theimdbapi.org/api/movie?movie_id=' + ids[j], function(error, response, body) {
    //   //   var imdbDetails = JSON.parse(body);
    //   //   console.log(imdbDetails);
    //   //   imdbResults.push(imdbDetails);
    //   //   // console.log("____________ imdbID: ", dbAndApi.imdbID);
    //   // })
    // };
    // console.log("_____imdbResults pushing all imdb data into array: ", imdbResults);

// console.log("______ dbAndApi w/ movieList and imdbResults: ",dbAndApi);

        db.movie.findOne( {
          where: { name: req.body.name }
          // order: [["name", "ASC"]]
        }).then(function(movie) {
          // console.log("______dbAndApi actor", dbAndApi.imdbID.stars[0]);
          dbAndApi.movie = movie;
          res.render('movies/results', {dbAndApi: dbAndApi });
        }).catch(function(error) {
          res.status(400).render('main/404'); //ToDO: make 404 page work
        });
      });
    });












// imdbResults --> dbAndApi after filling up imdbResults with 6 objects of data

router.get('/add', isLoggedIn, function(req, res) {
  res.render('movies/add');
});

router.get('/', isLoggedIn, function(req, res) {
  db.movie.findAll( {
    order: [["name", "ASC"]]
  }).then(function(movie) {
    // console.log("______movie[1].id_____", movie[1].id);
    res.render('movies/movies', {movie: movie });
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});

router.get('/:id', isLoggedIn, function(req, res) {
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
router.delete('/:id', isLoggedIn, function(req, res) {
  db.movie.destroy( {
    where: { id: req.params.id }
  }).then(function() {
    // console.log("_________delete in controllers/movies.js")
    res.redirect('/movies');
  });
});

// router.get('/:id/edit', function(req, res) {
//   db.movie.findOne(
//     { where: { id: req.params.id } }
//   ).then(function(movie) {
//     // console.log("______movie.name in EDIT: ", movie.name);
//     res.render('movies/edit', {movie: movie });
//   }).catch(function(error) {
//     res.status(400).render('main/404'); //ToDO: make 404 page work
//   });
// });
//ToDo: clean up routes - make edit part of /:id adn do route.put to /:id
router.put('/:id/:name', function(req, res) {
  db.movie.update(
    { name: req.params.name },
    { where: { id: req.params.id }
  }).then(function(id) {
    console.log("_________.then() in put in contr/movies, id: ", id);
    res.render('movies', {movie: movie });
    // console.log("_____________REDIRECT: ");
  }).catch(function(error) {
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});

// router.post('/', isLoggedIn, function(req, res) {
//   console.log("__________add movie to database", req.body.name);
//   db.movie.findOrCreate({
//     name: req.body.name
//   }).spread(function(user, created) {
//     if (created) {
//         res.redirect('/movies');
//     } else {
//       // if not created, the email already exists
//       req.flash('error', 'movie already exists');  //FLASH
//       res.redirect('/movies/add');
//     }
//   }).catch(function(error) {
//     // FLASH
//     req.flash('error', error.message);
//     res.redirect('/auth/signup');
//   });
// });
router.post('/', isLoggedIn, function(req, res) {
  db.movie.create({
    name: req.body.name
  }).then(function(data) {
    res.redirect('/movies');
  });
});


module.exports = router;
