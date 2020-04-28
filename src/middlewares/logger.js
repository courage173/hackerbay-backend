import fs from 'fs';
import path from 'path';

const logger = (req, res, next) => {
  const time = new Date().getMilliseconds();
  const reqPath = req.originalUrl;
  res.on('finish', () => {
    const t = new Date().getMilliseconds();
    const timeDiff = t - time;
    const data = `\n${req.method}\t${reqPath}\t${res.statusCode}\t${timeDiff}ms`;
    fs.appendFileSync(path.join(process.cwd(), '/src/requests.log'), data);
  });
  next();
};

export default logger;
