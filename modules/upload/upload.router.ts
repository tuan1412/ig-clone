import multer from 'multer';
import { Router } from 'express';
import { isAuth } from '../../common/isAuth';
import * as uploadHandler from './upload.handler';

const router = Router();
const fileUpload = multer();

router.post('/', isAuth, fileUpload.single('file'), uploadHandler.upload);

export default router;
