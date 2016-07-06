var _ = require('lodash');

var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');
var Pagination = require('../lib/pagination');

module.exports = function(resource, model) {
  return middleware;

  function middleware(req, res, next) {

    // Default pagination
    var defaultPagination = {
      offset: 0,
      limit: 50
    };

    req.query.page = req.query.page || defaultPagination;

    // Query
    mongooseAdapter.find(model, jsonApiMongoParser.parse(resource, req.query), function(err, results) {
      if (err) {
        next(err);
      }

      // Pagination links
      var pagination = new Pagination(req.query.page, results.total);
      var paginationLinks = pagination.getLinks(req.originalUrl);

      // Extra options
      var extraOptions = _.assign({
          count: results.data.length
        },
        _.pick(pagination, ['total', 'totalPage', 'number', 'size', 'offset', 'limit']),
        _.pick(paginationLinks, ['self', 'first', 'last', 'prev', 'next']));

      // Serialize
      res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
      res.send(jsonapiSerializer.serialize(resource, results.data, extraOptions));
    });
  }
}
