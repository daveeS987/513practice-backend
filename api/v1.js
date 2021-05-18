'use strict';

const cwd = process.cwd();
const express = require('express');
const router = express.Router();
const modelFinder = require(`${cwd}/middleware/model-finder.js`);

router.param('model', modelFinder.load);

router.get('/', handleHome);
router.get('/models', handleGetModelsList);
router.get('/:model/schema', handleGetSchemas);
router.get('/:model', handleGetAll);
router.post('/:model', handlePost);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

function handleHome(req, res, next) {
  res.status(200).send('The home route works');
}

function handleGetModelsList(request, response) {
  console.log('hi there');
  modelFinder.list().then((models) => response.status(200).json(models));
}

function handleGetSchemas(request, response) {
  response.status(200).json(request.model.jsonSchema());
}

async function handleGetAll(request, response, next) {
  try {
    let list = await request.model.get(request.query);
    const output = {
      count: list.length,
      results: list,
    };
    response.status(200).json(output);
  } catch (e) {
    next(e);
  }
}

async function handleGetOne(request, response, next) {
  try {
    let result = await request.model.get({ _id: request.params.id });
    response.status(200).json(result[0]);
  } catch (e) {
    next(e);
  }
}

async function handlePost(request, response, next) {
  try {
    let result = await request.model.create(request.body);
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function handlePut(request, response, next) {
  try {
    let result = await request.model.update(request.params.id, request.body);
    response.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

async function handleDelete(request, response, next) {
  try {
    await request.model.delete(request.params.id);
    response.status(200).json({});
  } catch (e) {
    next(e);
  }
}

module.exports = router;
