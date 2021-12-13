import { Router } from 'express';
import authRouter from './auth/auth.router';
import commentRouter from './comment/comment.router';
import postRouter from './post/post.router';
import uploadRouter from './upload/upload.router';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/comments', commentRouter);
baseRouter.use('/posts', postRouter);
baseRouter.use('/upload', uploadRouter);

export default baseRouter;
