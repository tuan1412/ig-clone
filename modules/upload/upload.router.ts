import multer from 'multer';
import { Router } from 'express';
import * as uploadHandler from './upload.handler';

const router = Router();
const fileUpload = multer();

router.post('/', fileUpload.single('file'), uploadHandler.upload);

export default router;
