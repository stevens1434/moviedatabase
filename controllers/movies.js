var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var omdb = require('omdb');
// var ejsLayouts = require('express-ejs-layouts');
// var methodOverride = require('method-override');

//ToDo:   findAll() - get list of movies
//        search more than just db.movies (such as db. genere/actors/,etc)
//        searchOrCreate() - offer to create new movie and somehow add to DB as well as redirect to a page to download the movie torrent

router.post('/results', function(req, res) {
  request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
    var data = JSON.parse(body);
    var movieList = data.Search;
    // console.log(req.body.name); //display what was typed into text box
    // console.log("______IMDB ID: ", data.Search[1].imdbID); //display imdb id number
    // console.log("______IMDB TITLE: ", data.Search[1].Title); // display imdb movie title
    // console.log("______IMDB YEAR: ", data.Search[1].Year); // display imdb year
    var imdbId = data.Search[1].imdbID; //same as above but for first movie in movieList array
    var imdbTitle = data.Search[1].Title;
    var imdbYear = data.Search[1].Year;
    console.log(imdbId + " " + imdbTitle + " " + imdbYear);
  });
  db.movie.findOne( {
    where: { name: req.body.name }
    // order: [["name", "ASC"]]
  }).then(function(movie) {
      res.render('results', {movie: movie });
      // console.log(movie);
  }).catch(function(error) {
    // console.log('_________________________________________', res.status);
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});






module.exports = router;
