'use strict';

var _ = require('lodash');

var mongooseAdapter = {};

mongooseAdapter.find = function(model, query, callback) {
  var dbQuery = model.find();

  // Select
  dbQuery.select(query.select);
  // Sort
  dbQuery.sort(query.sort);
  // Pagination
  if (query.page) {
    dbQuery.skip(query.page.skip);
    dbQuery.limit(query.page.limit);
  }
  // Populate
  if (query.populate) {
    dbQuery.populate(query.populate);
  }

  dbQuery.lean().exec(callback);
}

mongooseAdapter.findById = function(model, id, query, callback) {
  var dbQuery = model.findById(id).lean();

  // Select
  dbQuery.select(query.select);
  // Populate
  if (query.populate) {
    dbQuery.populate(query.populate);
  }

  dbQuery.exec(callback);
}

mongooseAdapter.findByIdAndUpdate = function(model, id, body, callback) {
  var update = {};

  // Attributes
  Object.assign(update, body.attributes);

  // relationships
  _.forOwn(body.relationships, function(value, key) {
    if (_.isArray(value.data)) {
      update[key] = value.data.map(function(d) {
        return d.id;
      })
    } else {
      update[key] = value.data.id;
    }
  });

  model.findByIdAndUpdate(id, update, {
    new: true
  }, callback);
}

mongooseAdapter.findRelationship = function(model, id, relationship, relationshipModel, query, callback) {

  var dbQuery = model.findById(id).lean();

  dbQuery.exec(function(err, document) {
    var relationshipId = document[relationship];
    var relationshipQuery;

    // To many relationship
    if (_.isArray(relationshipId)) {
      relationshipQuery = relationshipModel.find({
        _id: {
          $in: relationshipId
        }
      }).lean();
      // To one relationship
    } else {
      relationshipQuery = relationshipModel.findById(relationshipId).lean();
    }

    // Select
    relationshipQuery.select(query.select);
    // Sort
    relationshipQuery.sort(query.sort);
    // Pagination
    if (query.page) {
      relationshipQuery.skip(query.page.skip);
      relationshipQuery.limit(query.page.limit);
    }
    // Populate
    if (query.populate) {
      relationshipQuery.populate(query.populate);
    }

    relationshipQuery.exec(callback);
  });
}

mongooseAdapter.save = function(model, body, callback) {
  var newObject = {};

  // Attributes
  Object.assign(newObject, body.attributes);
  // Relationships
  _.forOwn(body.relationships, function(value, key) {
    if (_.isArray(value.data)) {
      newObject[key] = value.data.map(function(d) {
        return d.id;
      })
    } else {
      newObject[key] = value.data.id;
    }
  });

  // Save
  var doc = new model(newObject);
  doc.save(callback);
}

module.exports = mongooseAdapter;
