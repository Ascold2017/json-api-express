var _ = require('lodash');

var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');
var Pagination = require('../lib/pagination');

module.exports = function(resource, model, params) {
  return new Promise((resolve, reject) => {

    // Default pagination
    var defaultPagination = {
      offset: 0,
      limit: 50
    };

    params = params || { query: {}, originalUrl: null };
    
    params.query.page = params.query.page || defaultPagination;

    // Query
    mongooseAdapter.find(model, jsonApiMongoParser.parse(resource, params.query), function(err, results) {
      if (err) {
        return reject(err)
      }

      // Pagination links
      var pagination = new Pagination(params.query.page, results.total);
      var paginationLinks = pagination.getLinks(params.originalUrl);

      // Extra options
      var extraOptions = _.assign({
          count: results.data.length
        },
        _.pick(pagination, ['total', 'totalPage', 'number', 'size', 'offset', 'limit']),
        _.pick(paginationLinks, ['self', 'first', 'last', 'prev', 'next']));

      // Serialize
      resolve(jsonapiSerializer.serialize(resource, results.data, extraOptions))
    });
  })
}
