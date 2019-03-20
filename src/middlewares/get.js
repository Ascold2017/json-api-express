var async = require('async');

var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function(resource, model, params) {
  
  params = params || {
    id: null,
    query: null,
    originalUrl: null
  }

  return new Promise((resolve, reject) => {
    mongooseAdapter.findById(model, params.id, jsonApiMongoParser.parse(resource, params.query), function(err, document) {
      if (err) return reject(err);

      var extraOptions = {
        self: params.originalUrl,
        ...params.extraOptions ? params.extraOptions : {}
      };

      resolve(jsonapiSerializer.serialize(resource, document, extraOptions));
    });
  })

}
