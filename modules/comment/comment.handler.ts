import { RequestWithUser } from '../../common/isAuth';
import { wrapHandler } from '../../common/wrapHandler';
import * as commentController from './comment.controller';

export const create = wrapHandler(async (req, res) => {
  const user = (req as RequestWithUser).user;
  const { content, imageId } = req.body as { content: string; imageId: string };

  const newComment = await commentController.create({
    content,
    imageId,
    createdBy: user._id as string,
  });

  return newComment;
});
