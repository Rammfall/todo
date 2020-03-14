import { getConnection } from 'typeorm';
import request from 'supertest';

import User from '../../../db/entity/user';
import create from '../../../application';

describe('Register on api', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
  });

  test('Register user for request on /register/ route', async () => {
    await request(create)
      .post('/api/v1/user/create/')
      .send({
        username: 'apitestcreate',
        email: 'apitestcreate@api.ua',
        password: 'pass'
      });
    user = await User.findOne({ username: 'apitestcreate' });

    expect(user.email).toEqual('apitestcreate@api.ua');
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
