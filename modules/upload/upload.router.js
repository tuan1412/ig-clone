const multer = require('multer');
const router = require('express').Router();

const isAuth = require('../../middlewares/auth/isAuth');
const uploadController = require('./upload.controller');

const fileUpload = multer();

router.post('/', isAuth, fileUpload.single('file'), async (req, res) => {
  try {
    const result = await uploadController.upload(req.file.buffer);
    res.send({ success: 1, data: { url: result.url } });
  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

module.exports = router;
