import 'reflect-metadata';
import './database';

import express from 'express';
import 'express-async-errors';
import routes from './routes';

import uploadConfig from './config/upload';
import globalExceptionHandler from './middlewares/globalExceptionHandler';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333');
});
