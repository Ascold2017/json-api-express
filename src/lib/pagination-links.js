var qs = require('qs');
var url = require('url');
var _ = require('lodash');

module.exports = function(uri, query) {
  var info = url.parse(uri);
  var queryObj = qs.parse(info.query);

  queryObj = _.merge(queryObj, query);
  info.search = '?' + qs.stringify(queryObj, {
    encode: false
  });

  return url.format(info);
}
