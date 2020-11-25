const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema(
  {
    title: String,
    url: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', ImageSchema);
