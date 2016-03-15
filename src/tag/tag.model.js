const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tag', tagSchema);
