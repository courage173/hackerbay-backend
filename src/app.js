import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import login from './controllers/authController';
import jsonPatch from './controllers/jsonPatchController';
import Imagethumbnail from './controllers/thumbnailController';
import logMonitor from './controllers/logMonitorController';

import { verifyToken } from './middlewares/token';
import logger from './middlewares/logger';

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/v1/login', login);

app.patch('/v1/json-patch', verifyToken, logger, jsonPatch);

app.post('/v1/image_thumbnail', verifyToken, logger, Imagethumbnail);

app.get('/v1/logs', verifyToken, logger, logMonitor);

export default app;
