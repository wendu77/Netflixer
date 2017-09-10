'use strict';
// dependencies
var express = require('express');
var fetch   = require('node-fetch');
var favicon = require('serve-favicon');
// port
var port = process.env.PORT || 5000;
// instance of express app
var app  = express();
// serve static files from public directory
app.use('/static', express.static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('view engine', 'jade');

app.set('views', __dirname + '/views');

app.get('/', function(req, res, next) {
  var data = {};
  var movies = {};
  var error = '';
  var actor = '';

  if (req.query.actor !== undefined) {
    console.log('You searched for ' + req.query.actor);

    fetch('https://community-netflix-roulette.p.mashape.com/api.php?actor=' + req.query.actor, {
      method: 'GET',
      headers: {
        'X-Mashape-Key': 'DHmuGLtqcomshyLbBKe5akHeFbN1p1UqyGmjsn7uCNpoDXhBXo',
        'Accept': 'application/json',
        'Allow-Control-Allow-Origin': '*'
      },
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      console.log(json);

      if (json.message) {
        console.log(json.message);
        error = json.message;
      } else {
        movies = json;
      }

      res.render('index', {
        'actor': req.query.actor,
        'error': error,
        'results': movies
      });
    });
  } else {
    res.render('index', {
      'error': '',
      'results': []
    });
  }
});


app.listen(port, function(){
  console.log("App live on " + port);
});
