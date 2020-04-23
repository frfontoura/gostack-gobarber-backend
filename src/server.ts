import 'reflect-metadata';
import './database';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';

import uploadConfig from './config/upload';
import globalExceptionHandler from './middlewares/globalExceptionHandler';

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
