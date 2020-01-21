import { getConnection } from 'typeorm';

import createSession from '../../../../testUtils/user/createSession';
import User from '../../../db/entity/user';
import createUser from '../../../../testUtils/user/createUser';
import deleteUser from '../../../../testUtils/user/deleteUser';
import UserSession from '../../../db/entity/userSession';
import logout from './logout';

describe('Logout user', () => {
  let user: User;
  let session: UserSession;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testLogout', 'testLogout@test.email', 'pass');
    session = await createSession(user);
  });

  test('When we send refresh token on logout token removed in db', async () => {
    const { refreshToken } = session;
    await logout(refreshToken);

    expect(await UserSession.findOne({ refreshToken })).toEqual(undefined);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
