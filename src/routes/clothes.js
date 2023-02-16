'use strict';

const express = require('express');
const { clothesModel } = require('../models/clothes');

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
    const id = parseInt(req.params.id);
    const obj = req.body;
    let clothes = await clothesModel.findone({ where: { id: id } });
    let updatedClothes = await clothes.update(obj);
    res.status(200).json(updatedClothes);
  } catch (error) {
    next(error);
  }
});

router.delete('/clothes//:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let deletedClothes = await clothesModel.destroy({ where: { id } });
    res.status(204).json(deletedClothes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
