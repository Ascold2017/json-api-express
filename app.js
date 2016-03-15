var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./src/routes');
var initDb = require('./src/utils/init-db');

/**
 * Mongoose configuration
 */
var mongodbUrl = 'mongodb://localhost:27017/json-api-express';

// Database options
var dbOptions = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  },
  auto_reconnect: true
};

mongoose.connection.on('error', function(err) {
  console.error('MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
});

// Auto reconnect on disconnected
mongoose.connection.on('disconnected', function() {
  mongoose.connect(mongodbUrl, dbOptions);
});

// Connect to db
mongoose.connect(mongodbUrl, dbOptions);

/**
 * Express app configuration
 */
var app = express();
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Bootstrap routes
app.use(routes);

// Once database open, start server
mongoose.connection.once('open', function callback() {
  console.log('Connection with database succeeded.');
  mongoose.connection.db.dropDatabase();
  initDb.initAll(function() {
    console.log('Init database collections.');
    app.listen(8080, function() {
      console.log('app listening on port %d in %s mode', this.address().port, app.settings.env);
    });
  });
});
