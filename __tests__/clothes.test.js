'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('clothes server', () => {
  it('adds clothes', async () => {
    const response = await request.post('/clothes').send({
      type: 'T-shirt',
      size: 'small',
      cost: 1000,
    });

    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('T-shirt');
    expect(response.body.size).toEqual('small');
    expect(response.body.cost).toEqual(1000);
    expect(response.body.id).toBeTruthy();
  });

  it('gets a clothing item', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('T-shirt');
    expect(response.body[0].size).toEqual('small');
    expect(response.body[0].cost).toEqual(1000);
    expect(response.body[0].id).toBeTruthy();
  });

  it('gets all clothing items', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deletes an clothing item', async () => {
    const response = await request.delete('/clothes/1');
    expect(response.status).toEqual(200);
  });

  it('updates a clothing item', async () => {
    const response = await request.put('/clothes/1').send({
      type: 'T-shirt',
      size: 'small',
      cost: 1000,
    });
    expect(response.status).toEqual(200);
  });
});
