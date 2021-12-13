import { Router } from 'express';
import * as commentHandler from './comment.handler';
import { isAuth } from '../../common/isAuth';

const router = Router();

router.post('/', isAuth, commentHandler.create);

export default router;
