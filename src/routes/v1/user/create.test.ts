import { getConnection } from 'typeorm';
import request from 'supertest';

import User from '../../../db/entity/user';
import create from '../../../application';
import { createUser } from '../../../../testUtils/user';

describe('Register on api', () => {
  let user: User | undefined;
  let existingUser: User;

  beforeAll(async () => {
    await getConnection().connect();
    existingUser = await createUser(
      'apiCreateExistingUser',
      'apiCreateExistingUser@test.test',
      'pass'
    );
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

    if (user) {
      expect(user.email).toEqual('apitestcreate@api.ua');
    }
  });

  test('Register user with existing email no possible', async () => {
    const result = await request(create)
      .post('/api/v1/user/create/')
      .send({
        username: 'noapitestcreate',
        email: 'apiCreateExistingUser@test.test',
        password: 'pass'
      });

    expect(result.status).toEqual(403);
    expect(result.body.info).toEqual('Email are exist');
  });

  test('Register user with existing username no possible', async () => {
    const result = await request(create)
      .post('/api/v1/user/create/')
      .send({
        username: 'apiCreateExistingUser',
        email: 'noapiCreateExistingUser@test.test',
        password: 'pass'
      });

    expect(result.status).toEqual(403);
    expect(result.body.info).toEqual('Username are exist');
  });

  afterAll(async () => {
    if (user) await user.remove();
    await existingUser.remove();
    await getConnection().close();
  });
});
