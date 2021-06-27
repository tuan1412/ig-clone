import mongoose, { Schema, model, Document } from 'mongoose';
import { Comment } from '../comment/comment';

export interface Post {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  createdBy: string;
  comments?: Comment[];
}

export interface PostDocument extends Omit<Post, '_id'>, Document {}

const schema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, doc) => {
        delete doc.__v;
      },
    },
    toObject: { virtuals: true },
  }
);

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
});

export const PostModel = model<PostDocument>('Post', schema);
