import { getConnection } from 'typeorm';
import validator from 'validator';
import request from 'supertest';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import login from '../../../application';

describe('Login on api', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
  });

  test('Login on api route /login/', async () => {
    await request(login)
      .post('/api/v1/user/register/')
      .send({
        username: 'apiLoginUser',
        email: 'api@login.user',
        password: 'pass'
      });

    user = await User.findOne({ username: 'apiLoginUser' });

    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: 'apiLoginUser',
        password: 'pass'
      });
    const { refreshToken, accessToken } = result.body.auth;
    const session: UserSession = await UserSession.findOne({ user });

    expect(session.refreshToken).toEqual(refreshToken);
    expect(validator.isJWT(accessToken.split(' ')[1])).toEqual(true);
    expect(validator.isUUID(refreshToken)).toEqual(true);
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
