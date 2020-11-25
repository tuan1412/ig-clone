const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const { CLOUDARY_NAME, CLOUDARY_API_KEY, CLOUDARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDARY_NAME,
  api_key: CLOUDARY_API_KEY,
  api_secret: CLOUDARY_SECRET
});

const upload = async (buffer) => {
  const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  const result = await streamUpload(buffer);
  return result;
}

module.exports = {
  upload
}
