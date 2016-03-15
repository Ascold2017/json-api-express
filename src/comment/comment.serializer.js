module.exports = {
  id: '_id',
  blackList: ['__v'],
  links: {
    self: function(data) {
      return '/comments/' + data._id;
    }
  },
  relationships: {
    author: {
      type: 'people',
      links: {
        self: function(data) {
          return '/comments/' + data._id + '/relationships/author';
        },
        related: function(data) {
          return '/comments/' + data._id + '/author';
        }
      }
    }
  },
  topLevelMeta: {
    total: function(extraOptions) {
      return extraOptions.total;
    },
    count: function(extraOptions) {
      return extraOptions.count;
    }
  },
  topLevelLinks: {
    self: function(extraOptions) {
      return extraOptions.self;
    },
    first: function(extraOptions) {
      return extraOptions.first;
    },
    last: function(extraOptions) {
      return extraOptions.last;
    },
    prev: function(extraOptions) {
      return extraOptions.prev;
    },
    next: function(extraOptions) {
      return extraOptions.next;
    }
  }
}
