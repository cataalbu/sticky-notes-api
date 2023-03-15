import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { errorHandler, logEvents, logger } from './middleware';
import { corsOptions, connectDb } from './config';

const app = express();

connectDb();

// MIDDLEWARE

// url encoded form data
app.use(express.urlencoded({ extended: false }));
// json body data
app.use(express.json());
// cookies
app.use(cookieParser());
//cors middleware
app.use(cors(corsOptions));

// custom logger
app.use(logger);

app.use('/', router);
app.use('/', (req, res) => res.status(404).json({ message: '404 Not found' }));

// error handler logger
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log('Server running on port', process.env.PORT);
  });
});
mongoose.connection.once('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}\t`,
    'mongoErrLog.log'
  );
});
