var JSONAPIMongoParser = require('json-api-mongo-parser');

var jsonApiMongoParser = new JSONAPIMongoParser({
  article: {
    relationships: {
      author: {
        type: 'people',
        options: {
          lean: true
        }
      },
      tag: {
        type: 'tag',
        options: {
          lean: true
        }
      },
      comments: {
        type: 'comment',
        options: {
          lean: true
        }
      }
    }
  },
  comment: {
    relationships: {
      author: {
        type: 'people',
        options: {
          lean: true
        }
      }
    }
  }
});

module.exports = jsonApiMongoParser;
