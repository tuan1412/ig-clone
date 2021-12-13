import { CommentModel, Comment } from './comment';

export const create = async ({
  content,
  imageId,
  createdBy,
}: Comment): Promise<Comment> => {
  const newComment = await CommentModel.create({ content, imageId, createdBy });
  return newComment;
};
