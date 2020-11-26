const CommentModel = require('./comment');

const create = async ({ content, imageId, user }) => {
  const newComment = await CommentModel.create({ content, imageId, createdBy: user._id });
  return newComment;
}

module.exports = {
  create
}