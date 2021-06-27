import { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

export const initRealtimeServer = (app: Express): http.Server => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('socket connected');

    socket.on('request-comment', (postId: string) => {
      console.log('join', postId);
      socket.join(`comment_post_${postId}`);
    });

    socket.on('typing-comment', (postId: string) => {
      socket.to(`comment_post_${postId}`).emit('typing');
    });

    socket.on('stop-typing-comment', (postId: string) => {
      socket.to(`comment_post_${postId}`).emit('stop-typing');
    });

    socket.on('show-comment', (postId: string, comment: string) => {
      socket.to(`comment_post_${postId}`).emit('new-comment', comment);
    });
  });

  return server;
};
