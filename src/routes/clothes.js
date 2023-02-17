'use strict';

const express = require('express');
const { clothesModel } = require('../models');

const router = express.Router();

router.get('/clothes', async (req, res, next) => {
  const clothes = await clothesModel.findAll();
  res.status(200).send(clothes);
});

router.post('/clothes', async (req, res, next) => {
  try {
    const newClothes = await clothesModel.create(req.body);
    res.status(200).send(newClothes);
  } catch (error) {
    next(error);
  }
});

router.get('/clothes/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const clothes = await clothesModel.findone({ where: { id: id } });
    res.status(200).send(clothes);
  } catch (error) {
    next(error);
  }
});

router.put('/clothes/:id', async (req, res, next) => {
  try {
    const updatedFood = await clothesModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(updatedFood);
  } catch (error) {
    next(error);
  }
});

router.delete('/clothes/:id', async (req, res, next) => {
  try {
    await clothesModel.destroy({ where: { id: req.params.id } });
    res.status(200).send('Clothes Deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
