import { Schema, model, Document } from 'mongoose';

export interface User {
  _id?: string;
  username: string;
  password?: string;
  oauthId?: string;
  token?: string;
}

export interface UserDocument extends Omit<User, '_id'>, Document {}

const schema = new Schema<UserDocument>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    oauthId: String,
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

export const UserModel = model<UserDocument>('User', schema);
