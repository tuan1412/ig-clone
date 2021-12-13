import mongoose, { Schema, model, Document } from 'mongoose';

export interface Comment {
  _id?: string;
  content: string;
  createdBy: string;
  imageId: string;
}

export interface CommentDocument extends Omit<Comment, '_id'>, Document {}

const schema = new Schema<CommentDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    imageId: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, doc) => {
        delete doc.__v;
      },
    },
  }
);

export const CommentModel = model<CommentDocument>('Comment', schema);
