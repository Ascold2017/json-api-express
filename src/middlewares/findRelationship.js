var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function find(resource, model, relationship, relationshipType, relationshipModel) {
  return middleware;

  function middleware(req, res, next) {

    // Default pagination
    var defaultPagination = {
      offset: 0,
      limit: 50
    };

    req.query.page = req.query.page || defaultPagination;

    mongooseAdapter.findRelationship(model, req.params.id, relationship, relationshipModel, jsonApiMongoParser.parse(resource, req.query), function(err, results) {
      if (err) {
        next(err);
      }

      // Pagination links
      var paginationLinks = new Pagination(req.query.page, results.total).getLinks(req.originalUrl);

      var extraOptions = {
        total: results.total,
        count: results.data.length,
        self: req.originalUrl,
        first: paginationLinks.first,
        last: paginationLinks.last,
        prev: paginationLinks.prev,
        next: paginationLinks.next
      };

      res.send(jsonapiSerializer.serialize(relationshipType, results.data, extraOptions));
    });
  }
}
