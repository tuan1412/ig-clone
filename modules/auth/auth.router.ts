import { Router } from 'express';
import * as authHandler from './auth.handler';
import { isAuth } from '../../common/isAuth';

const router = Router();

router.post('/register', authHandler.register);
router.post('/login', authHandler.login);
router.post('/login/oauth', authHandler.loginOauth);
router.get('/verify', isAuth, authHandler.verify);

export default router;
