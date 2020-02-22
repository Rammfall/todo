import { getConnection } from 'typeorm';
import validator from 'validator';
import request from 'supertest';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import login from '../../../application';
import { createUser, deleteUser } from '../../../../testUtils/user';

describe('Login on api', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('apiLoginUser', 'api@login.user', 'pass');
  });

  test('Login on api route /login/ success', async () => {
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

  test('Login on api route /login/ error with wrong password', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: 'apiLoginUser',
        password: 'pass1'
      });

    const { info } = result.body;

    expect(info).toEqual('Password is wrong');
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
