import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';

import tasksRouter from './router/taskRouter.js';
import usersRouter from './router/userRouter.js';

import express from 'express';
import {authenticateUser} from './middleware/authMiddleware.js'

import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100;

app.use('/api/tasks', authenticateUser, tasksRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});