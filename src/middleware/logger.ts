import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    fs.existsSync(path.join(__dirname, '..', '..', 'logs', logFileName));
    await fsPromises.appendFile(
      path.join(__dirname, '..', '..', 'logs', logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.url}`);
  next();
};

export default logger;
