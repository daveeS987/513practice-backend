'use strict';

import express from 'express';
import cors from 'cors';

import notFoundHandler from './middleware/404.js';
import errorHandler from './middleware/500.js';
import logger from './middleware/logger.js';

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = {
  app,
  start: (port) => {
    app.listen(port, console.log(`Listening on Port: ${port}`));
  },
};
