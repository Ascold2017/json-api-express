var jsonapiSerializer = require('../jsonapiSerializer');
var jsonApiMongoParser = require('../jsonapiMongoParser');
var mongooseAdapter = require('../lib/mongoose-adapter');

module.exports = function(resource, model, data) {
  return new Promise((resolve, reject) => {
    mongooseAdapter.save(model, data, function(err, document) {
      if (err) {
        return reject(err);
      }
      resolve(jsonapiSerializer.serialize(resource, document.toObject()))
    });
  })
}
