const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    content: '',
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    imageId: {
      type: mongoose.Types.ObjectId,
      ref: 'Image'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
