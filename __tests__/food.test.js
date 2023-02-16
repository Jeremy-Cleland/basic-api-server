'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelize } = require('../src/models/index');
const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('food server', () => {
  it('adds food', async () => {
    const response = await request.post('/food').send({
      meal: 'Ribeye',
      mealSize: 'Family',
      mealType: 'Dinner',
    });

    expect(response.status).toEqual(200);
    expect(response.body.meal).toEqual('Ribeye');
    expect(response.body.mealSize).toEqual('Family');
    expect(response.body.mealType).toEqual('Dinner');
    expect(response.body.id).toBeTruthy();
  });

  it('gets meal', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
    expect(response.body[0].meal).toEqual('Ribeye');
    expect(response.body[0].mealSize).toEqual('Family');
    expect(response.body[0].mealType).toEqual('Dinner');
    expect(response.body[0].id).toBeTruthy();
  });

  it('gets all meals', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deletes an meal', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toEqual(200);
  });

  it('updates an meal', async () => {
    const response = await request.put('/food/1').send({
      meal: 'T-bone',
      mealSize: 'Family',
      mealType: 'Dinner',
    });
    expect(response.status).toEqual(200);
  });
});
