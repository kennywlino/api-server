'use strict';

const express = require('express');

const { animalInterface } = require('../models');

const router = express.Router();

// GET all
router.get('/animal', async (req, res, next) => {
  try {
    const animals = await animalInterface.read();
    res.status(200).send(animals);
  } catch(e) {
    next(e);
  }
});

// GET one
router.get('/animal/:id', async (req, res, next) => {
  const id = req.params.id;
  const selectedAnimal = await animalInterface.read(id);
  res.status(200).send(selectedAnimal);
});

router.post('/animal', async (req, res, next) => {
  try {
    const newAnimal = await animalInterface.create(req.body);
    res.status(200).send(newAnimal);
  } catch(e) {
    next(e);
  }
});

router.put('/animal/:id', async (req, res, next) => {
  try {
    const updatedAnimal = await animalInterface.update(req.body, req.params.id);
    console.log('UPDATE path', updatedAnimal);
    res.status(200).send(updatedAnimal);
  } catch(e) {
    next(e);
  }
});

router.delete('/animal/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await animalInterface.delete(id);
    res.status(200).send('Item deleted');
  } catch(e) {
    next(e); 
  }
});

module.exports = router;