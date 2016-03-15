var paginationLinks = require('./pagination-links');

function PaginationOffset(offset, limit, total) {
  offset = Number(offset);
  limit = Number(limit);
  total = Number(total);

  var lastOffset = total - ((total % limit) || limit);
  var prevOffset = offset - limit;

  this.limit = limit;
  this.first = 0;
  this.last = lastOffset > 0 ? lastOffset : 0;
  this.prev = prevOffset >= 0 ? prevOffset : null;
  this.next = offset + limit < total ? offset + limit : null
}

PaginationOffset.prototype.getLinks = function(uri) {

  var links = {};

  links.self = uri;
  links.first = paginationLinks(uri, {
    page: {
      offset: this.first,
      limit: this.limit
    }
  });
  links.last = paginationLinks(uri, {
    page: {
      offset: this.last,
      limit: this.limit
    }
  });

  if (this.prev !== null && this.prev >= 0) {
    links.prev = paginationLinks(uri, {
      page: {
        offset: this.prev,
        limit: this.limit
      }
    })
  }

  if (this.next) {
    links.next = paginationLinks(uri, {
      page: {
        offset: this.next,
        limit: this.limit
      }
    })
  }

  return links;
};

module.exports = PaginationOffset;
