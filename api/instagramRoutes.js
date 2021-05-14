'use strict';

import express from 'express';
const router = express.Router();

import dbModel from '../models/dbModel.js';

router.get('/', handleHome);
router.post('/upload', handleUpload);
router.get('/sync', handleSync);

function handleHome(req, res, next) {
  res.status(200).send('The home route works');
}

function handleUpload(req, res, next) {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
}

function handleSync(req, res, next) {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

export default router;
