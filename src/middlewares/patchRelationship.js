var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function(resource, model) {
  return middleware;

  function middleware(req, res, next) {
    mongooseAdapter.updateRelationship(model, req.params.id, req.params.relationship, req.body.data, function(err, document) {
      res.send(jsonapiSerializer.serialize(resource, document.toObject()));
    });
  }
};
