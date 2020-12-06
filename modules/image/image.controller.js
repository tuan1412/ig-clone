const ImageModel = require('./image');
const CustomError = require('../../shared/error');

const create = async ({ title, url, user, description }) => {
  const newImage = await ImageModel.create({ title, url, description, createdBy: user._id });
  return newImage;
}

const findOne = async (id) => {
  const foundImage = await ImageModel
    .findById(id)
    .populate('createdBy', 'username')
    .populate('comments', 'content')

  if (!foundImage) {
    throw new CustomError('Not found image', 400);
  }

  return foundImage;
}

module.exports = {
  create,
  findOne
}