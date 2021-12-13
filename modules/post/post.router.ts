import { Router } from 'express';
import * as postHandler from './post.handler';
import { isAuth } from '../../common/isAuth';

const router = Router();

router.get('/', postHandler.getAllImages);
router.post('/', isAuth, postHandler.create);
router.get('/:id', postHandler.getOne);

export default router;
