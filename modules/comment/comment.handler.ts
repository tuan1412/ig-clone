import { RequestWithUser } from '../../common/isAuth';
import { wrapHandler } from '../../common/wrapHandler';
import * as commentController from './comment.controller';

export const create = wrapHandler(async (req, res) => {
  const user = (req as RequestWithUser).user;
  const { content, postId } = req.body as { content: string; postId: string };

  return commentController.create({
    content,
    postId,
    createdBy: user._id as string,
  });
});
