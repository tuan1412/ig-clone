const authRouter = require('./auth/auth.router');
const uploadRouter = require('./upload/upload.router');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/upload', uploadRouter)
}