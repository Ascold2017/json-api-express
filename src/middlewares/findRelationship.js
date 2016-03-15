var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function find(resource, model, relationship, relationshipType, relationshipModel) {
  return middleware;

  function middleware(req, res, next) {
    mongooseAdapter.findRelationship(model, req.params.id, relationship, relationshipModel, jsonApiMongoParser.parse(resource, req.query), function(err, document) {
      res.send(jsonapiSerializer.serialize(relationshipType, document));
    });
  }
}
