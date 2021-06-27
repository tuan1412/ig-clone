import { CommentModel, Comment } from './comment';

export const create = async ({
  content,
  postId,
  createdBy,
}: Comment): Promise<Comment> => {
  const newComment = await CommentModel.create({ content, postId, createdBy });
  return newComment;
};
