'use strict';

import express from 'express';
import cors from 'cors';

import notFoundHandler from './middleware/404.js';
import errorHandler from './middleware/500.js';
import logger from './middleware/logger.js';

import instagramRoutes from './api/v1.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(instagramRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

export default {
  app,
  start: (port) => {
    app.listen(port, console.log(`Listening on Port: ${port}`));
  },
};
