var mongoose = require('mongoose');
var async = require('async');

var Article = require('../article/article.model');
var People = require('../people/people.model');
var Comment = require('../comment/comment.model');
var Tag = require('../tag/tag.model');

var articles = [{
  _id: "56dd7d8bea4c753c2f614af4",
  title: "JSON API paints my bikeshed!",
  body: "The shortest article. Ever.",
  author: "56dfe0481677fa21d36c5849",
  comments: ["56dd7b034dcb0ca8192b9c5e", "56dea7aa6609e2e814af38f5"],
  tag: "56dfe0ce1677fa21d36c584c"
}, {
  _id: "56dea87171cd0cac15cb3e5b",
  title: "JSON API 1.0",
  body: "JSON API specifications",
  author: "56dd7afd4dcb0ca8192b9c56",
  comments: ["56dd7b024dcb0ca8192b9c5d", "56dd7afe4dcb0ca8192b9c58"],
  tag: "56dfe0ce1677fa21d36c584c"
}, {
  _id: "56dd77e2f4514c280b219181",
  title: "NodeJS Best Practices",
  body: "Styleguide for NodeJS",
  author: "56dd7afd4dcb0ca8192b9c56",
  comments: ["56dfe0a41677fa21d36c584a"],
  tag: "56dfe0f51677fa21d36c584e"
}];

var peoples = [{
  _id: "56dfe0481677fa21d36c5849",
  firstname: "Kaley",
  lastname: "Maggio",
  email: "Kaley-Maggio@example.com",
  age: "80",
  gender: "male"
}, {
  _id: "56dd7afd4dcb0ca8192b9c56",
  firstname: "Harold",
  lastname: "Marvin",
  email: "Harold-Marvin@example.com",
  age: "30",
  gender: "male"
}];

var comments = [{
  _id: "56dd7b034dcb0ca8192b9c5e",
  body: "First !",
  author: "56dd7afd4dcb0ca8192b9c56"
}, {
  _id: "56dea7aa6609e2e814af38f5",
  body: "I Like it !",
  author: "56dd7afd4dcb0ca8192b9c56"
}, {
  _id: "56dd7b024dcb0ca8192b9c5d",
  body: "Awesome",
  author: "56dfe0481677fa21d36c5849"
}, {
  _id: "56dd7afe4dcb0ca8192b9c58",
  body: "Recommended",
  author: "56dfe0481677fa21d36c5849"
}, {
  _id: "56dfe0a41677fa21d36c584a",
  body: "Really nice",
  author: "56dd7afd4dcb0ca8192b9c56"
}];

var tags = [{
  _id: "56dfe0ce1677fa21d36c584c",
  title: "JSONAPI"
}, {
  _id: "56dfe0f51677fa21d36c584e",
  title: "NODEJS"
}]

var initDb = {};

initDb.initArticles = function(callback) {
  async.each(articles, function(article, cb) {
    var dbArticle = new Article(article);
    dbArticle.save(cb)
  }, function done(err) {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

initDb.initPeoples = function(callback) {
  async.each(peoples, function(people, cb) {
    var dbPeople = new People(people);
    dbPeople.save(cb)
  }, function done(err) {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

initDb.initComments = function(callback) {
  async.each(comments, function(comment, cb) {
    var dbComment = new Comment(comment);
    dbComment.save(cb)
  }, function done(err) {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

initDb.initTags = function(callback) {
  async.each(tags, function(tag, cb) {
    var dbTag = new Tag(tag);
    dbTag.save(cb)
  }, function done(err) {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

initDb.initAll = function(callback) {
  async.parallel({
    initArticles: initDb.initArticles,
    initPeoples: initDb.initPeoples,
    initComments: initDb.initComments,
    initTags: initDb.initTags,
  }, function(err) {
    if (err) {
      console.log(err);
    }
    callback();
  })
}

module.exports = initDb;
