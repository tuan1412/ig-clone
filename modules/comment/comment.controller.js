const CommentModel = require('./comment');

const create = async ({ content, imageId, user }) => {
  const newComment = await CommentModel.create({ content, imageId, createdBy: user._id });
  const cloneComment = JSON.parse(JSON.stringify(newComment));

  return { ...cloneComment, createdBy: user };
}

module.exports = {
  create
}