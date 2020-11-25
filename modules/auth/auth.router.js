const router = require('express').Router();
const authController = require('./auth.controller');

router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    const newUser = await authController.register({ username, password, confirmPassword });

    res.status(201).send({ success: 1, data: newUser });

  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authController.login({ username, password });

    res.send({ success: 1, data: token });
  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

module.exports = router;