const router = require('express').Router();
const authController = require('./auth.controller');
const isAuth = require('../../middlewares/isAuth');

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
    const user = await authController.login({ username, password });

    res.send({ success: 1, data: user });
  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

router.post('/login/oauth', async (req, res) => {
  try {
    const { oauthId, username } = req.body;
    const user = await authController.loginOauth({ oauthId, username });

    res.send({ success: 1, data: user });
  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});


router.get('/verify', isAuth, async (req, res) => {
  try {
    res.send({ success: 1, data: req.user });
  } catch ({ message, status = 500 }) {
    res.status(status).send({ success: 0, message })
  }
});

module.exports = router;