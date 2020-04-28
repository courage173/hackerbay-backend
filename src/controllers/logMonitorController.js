import fs from 'fs';
import path from 'path';

const logMonitor = (re, res) => {
  res.set('content-type', 'text/plain');
  const data = fs.readFileSync(path.join(process.cwd(), '/src/requests.log'));
  console.log(typeof data)
  return res.status(200).send(data);
};

export default logMonitor;
