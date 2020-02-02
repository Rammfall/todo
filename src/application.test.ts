import request from 'supertest';
import { getConnection } from 'typeorm';

import app from './application';

describe('Checking application routes', () => {
  test('Checking root route', async () => {
    const result = await request(app).get('/');

    expect(result.status).toEqual(200);
  });

  afterAll(async () => {
    await getConnection().close();
  });
});
