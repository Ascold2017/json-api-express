var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function find(resource, model) {
  return middleware;

  function middleware(req, res, next) {
    mongooseAdapter.findById(model, req.params.id, jsonApiMongoParser.parse(resource, req.query), function(err, document) {
      serializedData = jsonapiSerializer.serialize(resource, document);
      var response = {};
      response.jsonapi = serializedData.jsonapi;
      Object.assign(response, serializedData.data.relationships[req.params.relationship]);
      res.send(response);
    });
  }
}
