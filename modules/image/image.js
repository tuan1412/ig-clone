const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    description: String,
    likes: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    // timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

ImageSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'imageId'
});

module.exports = mongoose.model('Image', ImageSchema);
