import { PostModel, Post } from './post';
import { Paging } from '../../common/paging';
import { CustomError } from '../../common/customError';
import { StatusCodes } from 'http-status-codes';

export const getAllImages = async ({
  offset,
  limit,
}: Paging): Promise<[Post[], number]> => {
  const [posts, total] = await Promise.all([
    PostModel.find().skip(offset).limit(limit).sort({ createdAt: -1 }),
    PostModel.find().count(),
  ]);
  return [posts, total];
};

export const create = async ({
  title,
  imageUrl,
  createdBy,
  description,
}: Post): Promise<Post> => {
  const newPost = await PostModel.create({
    title,
    imageUrl,
    description,
    createdBy,
  });
  return newPost;
};

export const findOne = async (id: string): Promise<Post> => {
  const foundPost = await PostModel.findById(id)
    .populate('createdBy', 'username')
    .populate({
      path: 'comments',
      select: 'content',
      populate: {
        path: 'createdBy',
        select: 'username',
      },
    });

  if (!foundPost) {
    throw new CustomError(StatusCodes.BAD_REQUEST, 'Not found image');
  }

  return foundPost;
};
