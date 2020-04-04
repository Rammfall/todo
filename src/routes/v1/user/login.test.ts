import { getConnection } from 'typeorm';
import validator from 'validator';
import request from 'supertest';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import login from '../../../application';
import { createUser, deleteUser } from '../../../../testUtils/user';

describe('Login on api', () => {
  let user: User;
  const username = 'apiLoginUser';
  const email = 'api@login.user';
  const password = 'pass';

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(username, email, password);
  });

  test('Login on api route /login/ with username success', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: username,
        password
      });

    const accessCookie = result.header['set-cookie'][0];
    const accessToken = accessCookie.slice(13, accessCookie.indexOf(';'));
    const refreshCookie = result.header['set-cookie'][1];
    const refreshToken = refreshCookie.slice(13, refreshCookie.indexOf(';'));
    const session: UserSession = await UserSession.findOne({ user });

    expect(session.refreshToken).toEqual(refreshToken);
    expect(validator.isJWT(accessToken.split('%20')[1])).toEqual(true);
    expect(validator.isUUID(refreshToken)).toEqual(true);
    expect(result.status).toEqual(200);
    await session.remove();
  });

  test('Login on api route /login/ with email success', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: email,
        password
      });
    const accessCookie = result.header['set-cookie'][0];
    const accessToken = accessCookie.slice(13, accessCookie.indexOf(';'));
    const refreshCookie = result.header['set-cookie'][1];
    const refreshToken = refreshCookie.slice(13, refreshCookie.indexOf(';'));
    const session: UserSession = await UserSession.findOne({ user });

    expect(session.refreshToken).toEqual(refreshToken);
    expect(validator.isJWT(accessToken.split('%20')[1])).toEqual(true);
    expect(validator.isUUID(refreshToken)).toEqual(true);
    expect(result.status).toEqual(200);
    await session.remove();
  });

  test('Login with username on api route /login/ error with wrong password', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: username,
        password: 'passw'
      });

    const { info } = result.body;

    expect(info).toEqual('Password is wrong');
    expect(result.status).toEqual(403);
  });

  test('Login with email on api route /login/ error with wrong password', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: email,
        password: 'pass1'
      });

    const { info } = result.body;

    expect(info).toEqual('Password is wrong');
    expect(result.status).toEqual(403);
  });

  test('Login with no existing email on api', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: 'notExistingApi@login.user',
        password: 'pass1'
      });

    const { info } = result.body;

    expect(info).toEqual("Email doesn't exist");
    expect(result.status).toEqual(403);
  });

  test('Login with no existing username on api', async () => {
    const result = await request(login)
      .post('/api/v1/user/login/')
      .send({
        name: 'notExistingApiLoginUser',
        password: 'pass1'
      });

    const { info } = result.body;

    expect(info).toEqual("User doesn't exist");
    expect(result.status).toEqual(403);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
