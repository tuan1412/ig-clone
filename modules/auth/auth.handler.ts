import { wrapHandler } from '../../common/wrapHandler';
import * as authController from './auth.controller';
import { RequestWithUser } from '../../common/isAuth';

export const register = wrapHandler(async (req, res) => {
  const { username, password } = req.body;

  const newUser = await authController.register({ username, password });
  return newUser;
});

export const login = wrapHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await authController.login({ username, password });

  return user;
});

export const loginOauth = wrapHandler(async (req, res) => {
  const { oauthId, username } = req.body;
  const user = await authController.loginOauth({ oauthId, username });

  return user;
});

export const verify = wrapHandler(async (req, res) => {
  return (req as RequestWithUser).user;
});
