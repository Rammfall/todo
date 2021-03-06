import { getConnection } from 'typeorm';
import validator from 'validator';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import refresh from './refresh';
import {
  createUser,
  deleteUser,
  createSession
} from '../../../../testUtils/user';

describe('Logout user', () => {
  let user: User;
  let session: UserSession;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testRefresh', 'testLogout@refresh.email', 'pass');
    session = await createSession(user);
  });

  test('When we refresh, we delete current session and create new', async () => {
    const newSession = await refresh(session);
    const { accessToken, refreshToken } = newSession;

    expect(
      await UserSession.findOne({ refreshToken: session.refreshToken })
    ).toEqual(undefined);
    expect(validator.isUUID(refreshToken, '4')).toEqual(true);
    expect(
      validator.isJWT(accessToken.substring(accessToken.indexOf(' ') + 1))
    ).toEqual(true);
  });

  test('When refresh expired will be call exception', async () => {
    const expiredSession: UserSession = await createSession(
      user,
      -2 * 32 * 24 * 60 * 60 * 60
    );

    // eslint-disable-next-line jest/valid-expect
    expect(refresh(expiredSession)).rejects.toThrowError(
      new Error('Token not exist or expired')
    );
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
