import { getConnection } from 'typeorm';
import validator from 'validator';

import createSession from '../../../../testUtils/user/createSession';
import User from '../../../db/entity/user';
import createUser from '../../../../testUtils/user/createUser';
import deleteUser from '../../../../testUtils/user/deleteUser';
import UserSession from '../../../db/entity/userSession';
import refresh from './refresh';

describe('Logout user', () => {
  let user: User;
  let session: UserSession;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testLogout', 'testLogout@test.email', 'pass');
    session = await createSession(user);
  });

  test('When we refresh, we delete current session and create new', async () => {
    const { refreshToken } = session;
    const newSession = await refresh(refreshToken);
    const { accessToken } = newSession;

    expect(await UserSession.findOne({ refreshToken })).toEqual(undefined);
    expect(validator.isUUID(newSession.refreshToken, '4')).toEqual(true);
    expect(
      validator.isJWT(accessToken.substring(accessToken.indexOf(' ') + 1))
    ).toEqual(true);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
