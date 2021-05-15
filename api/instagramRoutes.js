'use strict';

import express from 'express';
const router = express.Router();

import dbModel from '../models/posts-schema.js';

router.get('/', handleHome);
router.post('/upload', handleUpload);
router.get('/sync', handleSync);

function handleHome(req, res, next) {
  res.status(200).send('The home route works');
}

async function handleUpload(req, res, next) {
  const body = req.body;

  // dbModel.save(body, (err, data) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.status(201).send(data);
  //   }
  // });
  let newRecord = new dbModel(req.body);
  let result = await newRecord.save();
  res.status(201).json(result);
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
