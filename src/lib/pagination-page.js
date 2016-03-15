var paginationLinks = require('./pagination-links');

function PaginationPage(number, limit, total) {
  number = Number(number);
  limit = Number(limit);
  total = Number(total);

  var totalPage = Math.ceil(total / limit);

  this.totalPage = totalPage;
  this.limit = limit;
  this.first = 1;
  this.last = totalPage === 0 ? 1 : totalPage;
  this.prev = number > 1 ? number - 1 : null;
  this.next = number !== totalPage ? number + 1 : null;
}

PaginationPage.prototype.getLinks = function(uri) {

  var links = {};

  links.self = uri;
  links.first = paginationLinks(uri, {
    page: {
      number: this.first
    }
  });
  links.last = paginationLinks(uri, {
    page: {
      number: this.last
    }
  });

  if (this.prev) {
    links.prev = paginationLinks(uri, {
      page: {
        number: this.prev
      }
    })
  }

  if (this.next) {
    links.next = paginationLinks(uri, {
      page: {
        number: this.next
      }
    })
  }

  return links;
};

module.exports = PaginationPage;
