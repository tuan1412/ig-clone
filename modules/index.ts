import { Router } from 'express';
import authRouter from './auth/auth.router';
import commentRouter from './comment/comment.router';
import postRouter from './post/post.router';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/comment', commentRouter);
baseRouter.use('/post', postRouter);

export default baseRouter;
