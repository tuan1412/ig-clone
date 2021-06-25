import { Router } from 'express';
import * as authController from './auth.controller';
import { isAuth, RequestWithUser } from '../../common/isAuth';
import { wrapHandler } from '../../common/wrapHandler';

const router = Router();

router.get(
  '/register',
  wrapHandler(async (req, res) => {
    const { username, password } = req.body;

    const newUser = await authController.register({ username, password });
    return newUser;
  })
);

router.post(
  '/login',
  wrapHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await authController.login({ username, password });

    return user;
  })
);

router.post(
  '/login/oauth',
  wrapHandler(async (req, res) => {
    const { oauthId, username } = req.body;
    const user = await authController.loginOauth({ oauthId, username });

    return user;
  })
);

router.get(
  '/verify',
  isAuth,
  wrapHandler(async (req, res) => {
    return (req as RequestWithUser).user;
  })
);

export default router;
