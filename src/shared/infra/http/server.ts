import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀️ Server started on port 3333');
});
