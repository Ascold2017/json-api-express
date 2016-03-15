const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'People',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
