const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('People', peopleSchema);
