const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    content: '',
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
