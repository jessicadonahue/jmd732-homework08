var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;
  
  if(req.query.director) {
    movieFilter.director = req.query.director; 
    searchExists = true;
  }
 
  Movie.find(movieFilter, function(err, movies, count) {
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});

router.post('/movies', function(req, res) {


});

//create a route for the API
router.get('/api/movies', function(req, res) {

  var directorFilter = req.query.director;
  var filter = false;

  if (directorFilter !== undefined ) {
    if(directorFilter.length === 0) {
      filter = false;
    }
    else {
      filter = true;
    }
  }
  else {
    filter = false;
  }

  //if the query string is there then filter for director
  if (filter == true) {

    //find everything in the database
    Movie.find({director: directorFilter}, function(err, movies, count) {
      res.json(movies.map( function(ele) {
        return {
          'title': ele.title,
          'director': ele.director,
          'year': ele.year
        };
      }));
    });   

  }
  else {

    //find everything in the database
    Movie.find({}, function(err, movies, count) {
      res.json(movies.map( function(ele) {
        return {
          'title': ele.title,
          'director': ele.director,
          'year': ele.year
        };
      }));
    });
  }
});

//create a movie based on the data in the POST requests body 
router.post('/api/movies/create', function(req, res) {

    (new Movie({
      title: req.body.title,
      director: req.body.director,
      year: parseInt(req.body.year)
  })).save(function(err, movie, count) {
    if (err) {

        res.json({
            'error': 'Unable to add movie to database'
        });

    }
    else {
        res.json(
            {
              'title': movie.title,
              'director': movie.director,
              'year': movie.year
            }
        );
    }

  });  

});


module.exports = router;












