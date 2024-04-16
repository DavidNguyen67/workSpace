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

const app = express();
const port = 8080;

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

app.listen(port);

mongoose
  .connect(env.ATLAS_URI || '', {})
  .then(() => {
    console.log('Connected to db', env.ATLAS_URI);
  })
  .catch((error) => {
    console.log('Failed to connect to db');
    console.log(error.message);
  });
