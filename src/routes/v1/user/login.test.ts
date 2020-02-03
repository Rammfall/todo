import { getConnection } from 'typeorm';
import validator from 'validator';
import request from 'supertest';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import login from '../../../application';
import { createUser, deleteUser } from '../../../../testUtils/user';

describe('Login on api', () => {
  let user: User;
  const password = 'pass';

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('apiLoginUser', 'api@login.user', password);
  });

  test('Login on api route /login/', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({ name: 'apiLoginUser', password });
    const { refreshToken, accessToken } = result.body;
    const session: UserSession = await UserSession.findOne({ user });

    expect(session.user.id).toEqual(user.id);
    expect(validator.isJWT(accessToken)).toEqual(true);
    expect(validator.isUUID(refreshToken)).toEqual(true);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
