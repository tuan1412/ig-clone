const authRouter = require('./auth/auth.router');
const uploadRouter = require('./upload/upload.router');
const imageRouter = require('./image/image.router');
const commentRouter = require('./comment/comment.router');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/upload', uploadRouter),
  app.use('/api/comments', commentRouter),
  app.use('/api/images', imageRouter)
}