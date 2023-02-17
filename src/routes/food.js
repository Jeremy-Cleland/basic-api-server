'use strict';

const express = require('express');
const { foodModel } = require('../models');

const router = express.Router();

router.get('/food', async (req, res, next) => {
  const food = await foodModel.findAll();
  res.status(200).send(food);
});

router.post('/food', async (req, res, next) => {
  try {
    const newFood = await foodModel.create(req.body);
    res.status(200).send(newFood);
  } catch (error) {
    next(error);
  }
});

router.get('/food/:id', async (req, res, next) => {
  try {
    const food = await foodModel.findByPk(req.params.id);
    res.status(200).send(food);
  } catch (error) {
    next(error);
  }
});

router.put('/food/:id', async (req, res, next) => {
  try {
    const updatedFood = await foodModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(updatedFood);
  } catch (error) {
    next(error);
  }
});

router.delete('/food/:id', async (req, res, next) => {
  try {
    await foodModel.destroy({ where: { id: req.params.id } });
    res.status(200).send('Food Deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
