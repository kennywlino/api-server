'use strict';

const express = require('express');

const { plantInterface } = require('../models');

const router = express.Router();

// GET all
router.get('/plant', async (req, res, next) => {
  try {
    const plants = await plantInterface.read();
    res.status(200).send(plants);
  } catch(e) {
    next(e);
  }
});

// GET one
router.get('/plant/:id', async (req, res, next) => {
  const id = req.params.id;
  const selectedPlant = await plantInterface.read(id);
  res.status(200).send(selectedPlant);
});

router.post('/plant', async (req, res, next) => {
  try {
    const newPlant = await plantInterface.create(req.body);
    res.status(200).send(newPlant);
  } catch(e) {
    next(e);
  }
});

router.put('/plant/:id', async (req, res, next) => {
  try {
    const updatedPlant = await plantInterface.update(req.body, req.params.id);
    console.log('UPDATE path', updatedPlant);
    res.status(200).send(updatedPlant);
  } catch(e) {
    next(e);
  }
});

router.delete('/plant/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await plantInterface.delete(id);
    res.status(200).send('Item deleted');
  } catch(e) {
    next(e); 
  }
});

module.exports = router;