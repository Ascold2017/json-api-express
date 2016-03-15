var async = require('async');

var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');
var PaginationOffset = require('../lib/pagination-offset');
var PaginationPage = require('../lib/pagination-page');

module.exports = function find(resource, model) {
  return middleware;

  function middleware(req, res, next) {
    async.parallel({
        total: function(callback) {
          model.count(callback);
        },
        data: function(callback) {
          mongooseAdapter.find(model, jsonApiMongoParser.parse(resource, req.query), callback);
        }
      },
      function(err, results) {
        if (err) {
          next(err);
        }
        // Pagination
        var pagination = {};
        if (req.query.page && req.query.page.number) {
          pagination = new PaginationPage(req.query.page.number, req.query.page.size, results.total).getLinks(req.originalUrl);
        } else if (req.query.page && req.query.page.offset) {
          pagination = new PaginationOffset(req.query.page.offset, req.query.page.limit, results.total).getLinks(req.originalUrl);
        } else {
          pagination = new PaginationOffset(0, 20, results.total).getLinks(req.originalUrl);
        }

        var extraOptions = {
          total: results.total,
          count: results.data.length,
          self: req.originalUrl,
          first: pagination.first,
          last: pagination.last,
          prev: pagination.prev,
          next: pagination.next
        };

        res.send(jsonapiSerializer.serialize(resource, results.data, extraOptions));
      });
  }
}
