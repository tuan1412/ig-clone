import { RequestWithUser } from '../../common/isAuth';
import { wrapHandler } from '../../common/wrapHandler';
import * as postController from './post.controller';

export const create = wrapHandler(async (req, res) => {
  const user = (req as RequestWithUser).user;
  const { title, url, description } = req.body as {
    title: string;
    url: string;
    description: string;
  };

  const newPost = await postController.create({
    title,
    imageUrl: url,
    createdBy: user._id as string,
    description,
  });

  return newPost;
});

export const getAllImages = wrapHandler(async (req, res) => {
  const { offset, limit } = req.query;

  const offsetNumber = Number(offset) ? Number(offset) : 0;
  const limitNumber = Number(limit) ? Number(limit) : 0;

  const [images, total] = await postController.getAllImages({
    offset: offsetNumber,
    limit: limitNumber,
  });

  return { images, total };
});

export const getOne = wrapHandler(async (req, res) => {
  const { id } = req.params;

  const foundPost = await postController.findOne(id);

  return foundPost;
});
