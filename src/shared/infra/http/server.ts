import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/typeorm';
import '@shared/container';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';

import uploadConfig from '@config/upload';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(celebrateErrors());
app.use(globalExceptionHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀️ Server started on port 3333');
});
