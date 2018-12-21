var path = require('path');
var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var routes = require('./routes.js');
var config = require('../config.js');
var app = express();

  app.set('port', process.env.PORT || config.server.port);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(app.router);
  app.use(express.static(path.join(__dirname + 'public')));


// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/routes', routes.__allRoutes);
app.get('/', routes.index.index);
app.get('/favicon.ico', routes.index.favicon);
app.post('/github', routes.index.github);
app.post('/bitbucket', routes.index.bitbucket);

http.createServer(app).listen(app.get('port'), function(){
  console.log("ci server listening on port " + app.get('port'));
});
