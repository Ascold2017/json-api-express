'use strict';

var _ = require('lodash');
var async = require('async');

var mongooseAdapter = {};

var buildCollectionQuery = function(dbQuery, query) {
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
};

mongooseAdapter.find = function(model, query, callback) {
  async.parallel({
    total: function(cb) {
      model.count(cb);
    },
    data: function(cb) {
      var dbQuery = model.find().lean();
      buildCollectionQuery(dbQuery, query);
      dbQuery.exec(cb);
    }
  }, callback);
};

mongooseAdapter.findByIds = function(model, ids, query, callback) {
  var conditions = {
    _id: {
      $in: ids
    }
  };

  async.parallel({
    total: function(cb) {
      model.count(conditions).exec(cb);
    },
    data: function(cb) {
      var dbQuery = model.find(conditions).lean();
      buildCollectionQuery(dbQuery, query);
      dbQuery.exec(cb);
    }
  }, callback);
};

mongooseAdapter.findById = function(model, id, query, callback) {
  var dbQuery = model.findById(id).lean();

  // Select
  dbQuery.select(query.select);

  // Populate
  if (query.populate) {
    dbQuery.populate(query.populate);
  }

  dbQuery.exec(callback);
};

mongooseAdapter.findByIdAndUpdate = function(model, id, body, callback) {
  var update = {};

  // Attributes
  Object.assign(update, body.attributes);

  // relationships
  _.forOwn(body.relationships, function(value, key) {
    if (_.isArray(value.data)) {
      update[key] = value.data.map(function(d) {
        return d.id;
      });
    } else {
      update[key] = value.data.id;
    }
  });

  model.findByIdAndUpdate(id, update, {
    new: true
  }, callback);
};

mongooseAdapter.findRelationship = function(model, id, relationship, relationshipModel, query, callback) {
  var dbQuery = model.findById(id).lean();

  dbQuery.exec(function(err, document) {
    var relationshipId = document[relationship];

    // To many relationship
    if (_.isArray(relationshipId)) {
      mongooseAdapter.findByIds(relationshipModel, relationshipId, query, callback);
    }
    // To one relationship
    else {
      mongooseAdapter.findById(relationshipModel, relationshipId, query, callback);
    }
  });
};

mongooseAdapter.updateRelationship = function(model, id, relationship, data, callback) {
  var update = {};

  if (_.isArray(data)) {
    update[relationship] = data.map(function(d) {
      return d.id;
    });
  } else {
    update[relationship] = data.id;
  }

  model.findByIdAndUpdate(id, update, {
    new: true
  }, callback);
};

mongooseAdapter.createRelationship = function(model, id, relationship, data, callback) {

  model.findById(id, function(err, result) {
    result[relationship] = _.concat(result[relationship], data.map(function(d) {
      return d.id;
    }));

    result.save(callback);
  });
};

mongooseAdapter.deleteRelationship = function(model, id, relationship, data, callback) {

  model.findById(id, function(err, result) {
    result[relationship] = _.difference(result[relationship].toString(), data.map(function(d) {
      return d.id;
    }));

    result.save(callback);
  });
};


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
};

module.exports = mongooseAdapter;
