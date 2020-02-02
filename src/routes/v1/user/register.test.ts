import { getConnection } from 'typeorm';
import request from 'supertest';

import User from '../../../db/entity/user';
import register from '../../../application';

describe('All user tests for api', () => {
  let user: User;
  beforeAll(async () => {
    await getConnection().connect();
  });

  test('Register user for request on /register/ route', async () => {
    await request(register)
      .post('/api/v1/user/register/')
      .send({ username: 'apitest', email: 'api@api.ua', password: 'pass' });
    user = await User.findOne({ username: 'apitest' });

    expect(user.username).toEqual('apitest');
  });

  afterAll(async () => {
    await user.remove();

    await getConnection().close();
  });
});
