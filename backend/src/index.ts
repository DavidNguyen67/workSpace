import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from 'process';
import 'dotenv/config';
import userRouter from './routes/user.route';
import { StatusCodes } from 'http-status-codes';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (res, req) => {
  return req.send('Chat app');
});
app.use('/api/user', userRouter);

app.use('*', (req, res) =>
  res.json({ statusCode: StatusCodes.NOT_FOUND, message: 'Not found' })
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
