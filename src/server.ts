import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { json } from 'stream/consumers';

dotenv.config();

const app = express();

app.use('/', router);
app.use('/', (req, res) => res.status(404).json({ message: '404 Not found' }));

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT);
});
