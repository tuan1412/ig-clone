const initRealtimeServer = (app) => {
  const server = require('http').createServer(app);
  const io = require('socket.io')(server, {
    cors: {
      origin: "*",
    }
  });

  io.on('connection', socket => {
    console.log('socket connected');

    socket.on('request-comment', (postId) => {
      console.log('join', postId)
      socket.join(`comment_post_${postId}`);
    });

    socket.on('typing-comment', (postId) => {
      socket.to(`comment_post_${postId}`).emit('typing');
    });

    socket.on('stop-typing-comment', (postId) => {
      socket.to(`comment_post_${postId}`).emit('stop-typing');
    });

    socket.on('show-comment', (postId, comment) => {
      socket.to(`comment_post_${postId}`).emit('new-comment', comment);
    })
  });

  return server;
};

module.exports = initRealtimeServer;