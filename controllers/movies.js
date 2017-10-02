var express = require('express');
var router = express.Router();
var db = require('../models');
var model = require('../models');
var bodyParser = require('body-parser');
var passport = require('../config/ppConfig');
var request = require('request');
var omdb = require('omdb');
var $ = require('jQuery');
// var ejsLayouts = require('express-ejs-layouts');
// var methodOverride = require('method-override');

//ToDo:   findAll() - get list of movies
//        search more than just db.movies (such as db. genere/actors/,etc)
//        searchOrCreate() - offer to create new movie and somehow add to DB as well as redirect to a page to download the movie torrent
var dbAndApi = {};


router.post('/results', function(req, res) {
  request('http://www.omdbapi.com/?s=' + req.body.name + '&apikey=2fb112ab', function(error, response, body) {
    var data = JSON.parse(body);
    var movieList = data.Search;
    dbAndApi.movieList = movieList;
  });
  db.movie.findOne( {
    where: { name: req.body.name }
    // order: [["name", "ASC"]]
  }).then(function(movie) {
    console.log("______dbAndApi", dbAndApi.movieList);
    dbAndApi.movie = movie;
    res.render('results', {dbAndApi: dbAndApi });
  }).catch(function(error) {
    // console.log('_________________________________________', res.status);
    res.status(400).render('main/404'); //ToDO: make 404 page work
  });
});






module.exports = router;
