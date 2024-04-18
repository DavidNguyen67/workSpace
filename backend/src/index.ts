import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from 'process';
import 'dotenv/config';
import userRouter from './routes/user.route';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';
import roomRouter from './routes/room.route';
import messageRouter from './routes/message.route';
import { Server } from 'socket.io';
import http from 'http';
import {
  CONNECT,
  DISCONNECT,
  SOCKET_ACTION,
} from './utilities/constants/socket.constant';
import { OnlineUser } from './utilities/types/socket';
import { Message } from './utilities/types/message';

const app = express();
const server = http.createServer(app);
const port = 8080;
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
let onlineUsers: OnlineUser[] = [];

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/', (res, req) => req.send('Chat app'));
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);
app.use('*', (req, res) =>
  res.json({
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Route/Method not found',
  })
);

mongoose
  .connect(env.ATLAS_URI || '', {})
  .then(() => {
    console.log('Connected to db', env.ATLAS_URI);
  })
  .catch((error) => {
    console.log('Failed to connect to db');
    console.log(error.message);
  });

io.on(CONNECT, (socket) => {
  socket.on(SOCKET_ACTION.ADD_NEW_USER, (userId: string) => {
    if (!onlineUsers.some((item) => item.userId === userId)) {
      onlineUsers = [...onlineUsers, { socketId: socket.id, userId }];
    }
    io.emit(SOCKET_ACTION.RECEIVE_ONLINE_USERS, onlineUsers);
  });
  socket.on(SOCKET_ACTION.SEND_MESSAGE, (message: Message) => {
    console.log(message);
    io.emit(SOCKET_ACTION.RECEIVE_MESSAGES, onlineUsers);
  });
  socket.on(DISCONNECT, () => {
    let i: number | null = onlineUsers.findIndex(
      (item) => item.socketId === socket.id
    );
    i && onlineUsers.splice(i, 1);
    i = null;
    socket.broadcast.emit(SOCKET_ACTION.RECEIVE_ONLINE_USERS, onlineUsers);
  });
});

server.listen(port);
