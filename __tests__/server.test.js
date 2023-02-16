'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);

describe('API Server', () => {
  test('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });

  test('handles root path', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Welcome to main route!');
  });
  test('handles the person get route', async () => {
    const response = await request.get('/person?name=Jeremy');
    let nameJson = JSON.stringify({ name: 'Jeremy' });
    expect(response.text).toEqual(nameJson);
  });
});
