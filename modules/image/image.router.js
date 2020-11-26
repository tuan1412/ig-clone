const router = require('express').Router();
const imageController = require('./image.controller');
const isAuth = require('../../middlewares/isAuth');

router.post('/', isAuth, async (req, res) => {
  try {
    const { user } = req;
    const { title, url, description } = req.body;

    const newImage = await imageController.create({ title, url, user, description });

    res.status(201).send({ success: 1, data: newImage });

  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const foundImage = await imageController.findOne(id);

    res.status(201).send({ success: 1, data: foundImage });

  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

module.exports = router;