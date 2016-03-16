var qs = require('qs');
var url = require('url');
var _ = require('lodash');

function Pagination(pageQuery, total) {
  this.pagination = null;

  // Select the pagination strategy
  if (pageQuery) {
    if (pageQuery.number != null) {
      this.pagination = new PaginationPage(pageQuery.number, pageQuery.size, total);
    }

    if (pageQuery.offset != null) {
      this.pagination = new PaginationOffset(pageQuery.offset, pageQuery.limit, total);
    }
  }
}

Pagination.prototype.getLinks = function(uri) {
  var that = this;
  var links = {};

  var buildPageQuery = function(offsetNumber, limitSize) {
    var firstParam = that.pagination.number ? 'number' : 'offset';
    var secondParam = that.pagination.number ? 'size' : 'limit';

    var pagination = {};
    pagination.page = {};
    pagination.page[firstParam] = offsetNumber;
    pagination.page[secondParam] = limitSize;

    return pagination;
  };

  links.self = uri;

  links.first = paginationLinks(uri, buildPageQuery(this.pagination.first, this.pagination.limit));
  links.last = paginationLinks(uri, buildPageQuery(this.pagination.last, this.pagination.limit));
  if (this.pagination.prev != null) {
    links.prev = paginationLinks(uri, buildPageQuery(this.pagination.prev, this.pagination.limit));
  }
  if (this.pagination.next != null) {
    links.next = paginationLinks(uri, buildPageQuery(this.pagination.next, this.pagination.limit));
  }

  return links;
};

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
  this.next = offset + limit < total ? offset + limit : null;
}

function PaginationPage(number, size, total) {
  number = Number(number);
  limit = Number(size);
  total = Number(total);

  var totalPage = Math.ceil(total / limit);

  this.totalPage = totalPage;
  this.number = number;
  this.limit = limit;
  this.first = 1;
  this.last = totalPage === 0 ? 1 : totalPage;
  this.prev = number > 1 ? number - 1 : null;
  this.next = number !== totalPage ? number + 1 : null;
}

var paginationLinks = function(uri, query) {
  var info = url.parse(uri);
  var queryObj = qs.parse(info.query);

  queryObj = _.merge(queryObj, query);
  info.search = '?' + qs.stringify(queryObj, {
    encode: false
  });

  return url.format(info);
};

module.exports = Pagination;
