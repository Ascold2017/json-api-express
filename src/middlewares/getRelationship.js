var _ = require('lodash');

var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function(resource, model) {
  return middleware;

  function middleware(req, res, next) {
    // Query
    mongooseAdapter.findById(model, req.params.id, jsonApiMongoParser.parse(resource, req.query), function(err, document) {
      // Serialize
      serializedData = jsonapiSerializer.serialize(resource, document);

      // serialized relationship
      var serializedRelationship = serializedData.data.relationships[req.params.relationship];

      // Response
      var response = {};
      response.jsonapi = serializedData.jsonapi;
      // Meta
      if (_.isArray(serializedRelationship.data)) {
        response.meta = {
          count: serializedRelationship.data.length
        }
      }
      // Links + data
      _.assign(response, serializedRelationship);


      res.send(response);
    });
  }
}
