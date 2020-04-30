import { getConnection } from 'typeorm';
import request from 'supertest';
import { v4 } from 'uuid';

import logout from '../../../application';
import User from '../../../db/entity/user';
import {
  createSession,
  createUser,
  deleteUser
} from '../../../../testUtils/user';
import UserSession from '../../../db/entity/userSession';

describe('Logout user', () => {
  let user: User;
  let session: UserSession;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('logoutUser', 'logoutUser@email.test', 'pass');
    session = await createSession(user);
  });

  test('Logout user on route /api/v1/user/logout/', async () => {
    const result = await request(logout)
      .post('/api/v1/user/logout/')
      .set('Cookie', [`refreshToken=${session.refreshToken}`]);

    const accessCookie = result.header['set-cookie'][0];
    const accessToken = accessCookie.slice(13, accessCookie.indexOf(';'));
    const refreshCookie = result.header['set-cookie'][1];
    const refreshToken = refreshCookie.slice(13, refreshCookie.indexOf(';'));

    expect(accessToken).toEqual('');
    expect(refreshToken).toEqual('');
    expect(
      await UserSession.findOne({ refreshToken: session.refreshToken })
    ).toEqual(undefined);
  });

  test('Logout user with not valid refreshToken', async () => {
    const result = await request(logout)
      .post('/api/v1/user/logout/')
      .set('Cookie', [`refreshToken=${session.refreshToken}t`]);

    expect(result.status).toEqual(500);
    expect(result.body.info).toEqual('Not valid token');
  });

  test('Logout user with not existing refreshToken', async () => {
    const result = await request(logout)
      .post('/api/v1/user/logout/')
      .set('Cookie', [`refreshToken=${v4()}`]);

    expect(result.status).toEqual(500);
    expect(result.body.info).toEqual('Session not exist');
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
