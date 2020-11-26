const router = require('express').Router();
const commentController = require('./comment.controller');
const isAuth = require('../../middlewares/isAuth');

router.post('/', isAuth, async (req, res) => {
  try {
    const { user } = req;
    const { content, imageId } = req.body;

    const newComment = await commentController.create({ content, imageId, user });

    res.status(201).send({ success: 1, data: newComment });

  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

module.exports = router;