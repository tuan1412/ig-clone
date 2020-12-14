const ImageModel = require('./image');
const CustomError = require('../../shared/error');

const getAllImages = async ({ offset, limit }) => {
  const images = await ImageModel.find().skip(offset).limit(limit).populate('createdBy', 'username').sort({ createdAt: -1 });
  const total = await ImageModel.find().count();
  return [images, total];
}

const create = async ({ title, url, user, description }) => {
  const newImage = await ImageModel.create({ title, url, description, createdBy: user._id });
  return newImage;
}

const findOne = async (id) => {
  const foundImage = await ImageModel
    .findById(id)
    .populate('createdBy', 'username')
    .populate({
      path: 'comments',
      select: 'content',
      populate: {
        path: 'createdBy',
        select: 'username'
      }
    });

  if (!foundImage) {
    throw new CustomError('Not found image', 400);
  }

  return foundImage;
}

module.exports = {
  create,
  findOne,
  getAllImages
}