import cdinary from 'cloudinary';
import streamifier from 'streamifier';

const cloudinary = cdinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDARY_NAME,
  api_key: process.env.CLOUDARY_API_KEY,
  api_secret: process.env.CLOUDARY_SECRET,
});

export const upload = async (buffer: Buffer) => {
  const streamUpload = (buf: Buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((err, res) => {
        if (res) {
          resolve(res);
        } else {
          reject(err);
        }
      });

      streamifier.createReadStream(buf).pipe(stream);
    });
  };
  const result = await streamUpload(buffer);
  return result;
};
