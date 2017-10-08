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
var async = require('async');


var dbAndApi = {};
var imdbResults = [];
var imdbPoster = [];
var ids = [];

var getPosters = function(callback) {
  imdbPoster.push(imdbResults[1].poster.large);
}

var iterateThroughMovies = function(callback){
  for (var j = 0; j < 6; j++) {
    getMovieDetails(j, function(data){
    imdbResults.push(data);
  })
    callback(imdbResults);
  };
}

var getMovieDetails = function(j, callback){
    request('https://theimdbapi.org/api/movie?movie_id=' + ids[j], function(error, response, body) {
      var imdbDetails = JSON.parse(body);
      callback(imdbDetails);
    });
}
router.post('/results', function(req, res) {
    var ombdData = function(callback) {
      request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
        var data = JSON.parse(body);
        var movieList = data.Search;
        for (var i = 0; i < 6; i++) {
          ids.push(movieList[i].imdbID); // add OMDB movie ID's to ids array
        }
        var omdbFinal = callback;
        dbAndApi.omdbFinal = omdbFinal;
        callback(null, movieList);
      });
    }
    var imdbData = function(callback) {
      iterateThroughMovies(function(x) {
        // iterate(imdbResults); //might need to set up an outside var arr = {}; to push to and then callback
      });
      callback(null, imdbResults);
      // console.log("__________imdbResults: ", imdbResults);
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
      // dbAndApi.results = results;
      // console.log("__________results: ", results);
      // console.log("______dbAndApi in .series: ", dbAndApi);
      // console.log("______imdbResults: ", imdbResults);
      // console.log("++_____________++ dbAndApi.ombdFinal: ", dbAndApi.omdbFinal);
      // console.log("++_____________++ dbAndApi.imdbFinal: ", dbAndApi.imdbFinal);
      getPosters(imdbResults);
      console.log("______ imdbPoster: ", imdbPoster);
      res.render('movies/results', {results: results});
    });
})

// router.post('/results', function(req, res) {          //process.env.API_KEY
//   request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
//     var data = JSON.parse(body);
//     var movieList = data.Search;
//     dbAndApi.movieList = movieList;
//     for (var i = 0; i < 6; i++) {
//       ids.push(movieList[i].imdbID);
//     };
//     iterateThroughMovies( function(x) {
//     dbAndApi.imdbResults = imdbResults //callback(imdbResults____________)
//     })
//         db.movie.findOne( {
//           where: { name: req.body.name }
//         }).then(function(movie) {
//           // console.log("______dbAndApi actor", dbAndApi.imdbID.stars[0]);
//           dbAndApi.movie = movie;
//           res.render('movies/results', {dbAndApi: dbAndApi });
//         }).catch(function(error) {
//           res.status(400).render('main/404'); //ToDO: make 404 page work
//         });
//       });
//     });
// var api = require(../../.env);
// process.env.SESSION_SECRET
                    // var dbAndApi = {};
                    // var imdbResults = [];
                    // var ids = [];
                    // //
                    // var iterateThroughMovies = function(callback){
                    //   for (var j = 0; j < 6; j++) {
                    //     getMovieDetails(j, function(data){ // go down one line to run getMovieDetails()
                    //       imdbResults.push(data); //THIS IS PUSHING SOME DATA BUT only after a refresh and IT SEEMS TO BE ONLY TAKING ONE OF 6 OPTIONS... WHY?? ASYNC.SERIES FOR EVERYTHING PRIOR?
                    //       // console.log("_____data in iteratetroughmovies: ", data);
                    //     })
                    //       callback(imdbResults)
                    //       // console.log("imdbResults____________: ", imdbResults);
                    //   };
                    // }
                    // var getMovieDetails = function(j, callback){
                    //     request('https://theimdbapi.org/api/movie?movie_id=' + ids[j], function(error, response, body) {
                    //       var imdbDetails = JSON.parse(body);
                    //       // console.log("________imdbDetails in getMOvieDetails", imdbDetails);
                    //       callback(imdbDetails) //parse IMBD data and send it back to iterateThroughMovies()
                    //     });
                    // }
                    //
                    // router.post('/results', function(req, res) {          //process.env.API_KEY //2fb112ab
                    //   request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
                    //     var data = JSON.parse(body);
                    //     var movieList = data.Search;
                    //     dbAndApi.movieList = movieList;
                    //     for (var i = 0; i < 6; i++) {
                    //       ids.push(movieList[i].imdbID); // add OMDB movie ID's to ids array
                    //     };
                    //     iterateThroughMovies( function(x) { //add imdbResults to dbAndAPI as we iterateThroughMovies()
                    //       dbAndApi.imdbResults = imdbResults;
                    //     });
                    //       db.movie.findOne( {
                    //         where: { name: req.body.name }
                    //       }).then(function(movie) {
                    //         // console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
                    //         // console.log("_______ movie: ", movie);
                    //         dbAndApi.movie = movie;
                    //         console.log("________ dbAndApi: ", dbAndApi);
                    //         res.render('movies/results', {dbAndApi: dbAndApi });
                    //       }).catch(function(error) {
                    //         console.log("FOOFOOFOOFOOFOOFOOFOOFOOFOOFOOFOOFOOFOOFOO");
                    //         res.status(400).render('main/404'); //ToDO: make 404 page work
                    //       });
                    //   });
                    // });
                    // //use series async
// api call
  //.then API call
    //.then logic
      //res.render
// var dbAndApi = {};
// var imdbResults = {};
// var ids = [];

// router.post('/results', function(req, res) {
//   var ombdData = function(callback) {
//     request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
//       var data = JSON.parse(body);
//       var movieList = data.Search;
//       for (var i = 0; i < 6; i++) {
//         ids.push(movieList[i].imdbID); // add OMDB movie ID's to ids array
//       }
//       var omdbFinal = callback;
//       dbAndApi.omdbFinal = omdbFinal
//       callback(null, movieList);
//     });
//   }
//
//                   var imdbData = function(callback) {
//                     var imdbDetails = [];
//                     iterateThroughMovies( function(x) { //add imdbResults to dbAndAPI as we iterateThroughMovies()
//
//                       // for (var j=0; j <6; j++) {
//                         // request('https://theimdbapi.org/api/movie?movie_id=' + ids[j], function(error, response, body) {
//                         //   var data = JSON.parse(body);
//                         //   imdbDetails.push(data[j]);
//                           // console.log("____data: ", data);
//                           // console.log("______imdbDetails: ", imdbDetails);
//                         // });
//                         // imdbResults.push(imdbDetails[j]); //push details to results
//                         // imdbResults.imdbDetails = imdbDetails;
//                         // console.log("________imdbDetails1: ", imdbDetails);
//                       // }
//                     // var imdbFinal = callback;
//                     // dbAndApi.imdbFinal = imdbFinal;
//                     // callback(imdbResults);
//                     // console.log("________imdbDetails2: ", imdbDetails);
//                   });
//                   dbAndApi.imdbResults = imdbResults; //EVERYHTING PRIOR TO THIS NEEDS TO BE SLWOED DOWN... MAYBE ANOTHER ASYNC.SERIES FOR EVERYTHING PRIOR...PSEUDOCODE THAT
//                   console.log("________imdbDetails2: ", imdbDetails);
//                     console.log("_______imdbResults: ", imdbResults);
//                     console.log("_________dbAndApi: ", dbAndApi);
//                   };
//
//   var dbData = function(callback) {
//     db.movie.findOne( {
//       where: { name: req.body.name }
//     }).then(function(movie) {
//       var dbFinal = callback;
//       dbAndApi.dbFinal = dbFinal;
//       callback(null, movie);
//     });
//   }
//   async.series([ombdData, imdbData, dbData], function(err, results) {
//     // dbAndApi.results = results;
//     // console.log("__________results: ", results);
//     console.log("______imdbResults in .series: ", imdbResults);
//     // console.log("++_____________++ dbAndApi.ombdFinal: ", dbAndApi.omdbFinal);
//     // console.log("++_____________++ dbAndApi.imdbFinal: ", dbAndApi.imdbFinal);
//     res.render('movies/results', {dbAndApi: dbAndApi });
//   });
// });

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

router.post('/', isLoggedIn, function(req, res) {
  db.movie.create({
    name: req.body.name
  }).then(function(data) {
    res.redirect('/movies');
  });
});


module.exports = router;
