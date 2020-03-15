import { getConnection } from 'typeorm';
import validator from 'validator';
import request from 'supertest';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import refresh from '../../../application';
import {
  createSession,
  createUser,
  deleteUser
} from '../../../../testUtils/user';

describe('Login on api', () => {
  let user: User;
  const username = 'apiRefresh';
  const email = 'apiRefresh@login.user';
  const password = 'pass';
  let session: UserSession;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(username, email, password);
    session = await createSession(user);
  });

  test('Refresh on api route /refresh/ with username success', async () => {
    const result = await request(refresh)
      .post('/api/v1/user/refresh/')
      .set('Cookie', [`refreshToken=${session.refreshToken}`]);

    const accessCookie = result.header['set-cookie'][0];
    const accessToken = accessCookie.slice(13, accessCookie.indexOf(';'));
    const refreshCookie = result.header['set-cookie'][1];
    const refreshToken = refreshCookie.slice(13, refreshCookie.indexOf(';'));

    expect(validator.isJWT(accessToken.split('%20')[1])).toEqual(true);
    expect(validator.isUUID(refreshToken)).toEqual(true);
    expect(
      await UserSession.findOne({ refreshToken: session.refreshToken })
    ).toEqual(undefined);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
