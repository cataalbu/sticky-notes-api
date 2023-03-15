import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import corsOptions from './config/corsOptions';

const app = express();

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

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT);
});
