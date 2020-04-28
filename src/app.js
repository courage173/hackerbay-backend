/* eslint-disable import/extensions */
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import * as swaggerJson from '../public/swagger.json';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

import login from './controllers/authController.js';
import jsonPatch from './controllers/jsonPatchController.js';
import Imagethumbnail from './controllers/thumbnailController.js';
import logMonitor from './controllers/logMonitorController.js';


import { verifyToken } from './middlewares/token.js';
import logger from './middlewares/logger.js';

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/v1/login', login);

app.patch('/v1/json-patch', verifyToken, logger, jsonPatch);

app.post('/v1/image_thumbnail', verifyToken, logger, Imagethumbnail);

app.get('/v1/logs', verifyToken, logger, logMonitor);

export default app;
