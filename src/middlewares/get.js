var async = require('async');

var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function(resource, model) {
  return middleware;

  function middleware(req, res, next) {
    mongooseAdapter.findById(model, req.params.id, jsonApiMongoParser.parse(resource, req.query), function(err, document) {

      var extraOptions = {
        self: req.originalUrl
      };

      res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
      res.send(jsonapiSerializer.serialize(resource, document, extraOptions));
    });
  }
}
