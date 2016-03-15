var JSONAPISerializer = require('json-api-serializer');

var articleSerializer = require('./article/article.serializer');
var peopleSerializer = require('./people/people.serializer');
var commentSerializer = require('./comment/comment.serializer');
var tagSerializer = require('./tag/tag.serializer');

var Serializer = new JSONAPISerializer();

// Article
Serializer.register('article', articleSerializer);
// People
Serializer.register('people', peopleSerializer);
// Tag
Serializer.register('tag', tagSerializer);
// Comment
Serializer.register('comment', commentSerializer);

module.exports = Serializer;
