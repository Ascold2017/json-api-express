var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');
var Pagination = require('../lib/pagination');

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

      var extraOptions = {
        self: req.originalUrl
      }

      // To many relationships
      if (results.data) {
        // Pagination links
        var paginationLinks = new Pagination(req.query.page, results.total).getLinks(req.originalUrl);
        extraOptions = {
          total: results.total,
          count: results.data.length,
          self: req.originalUrl,
          first: paginationLinks.first,
          last: paginationLinks.last,
          prev: paginationLinks.prev,
          next: paginationLinks.next
        };
      }

      results = results.data || results;
      res.send(jsonapiSerializer.serialize(relationshipType, results, extraOptions));
    });
  }
}
