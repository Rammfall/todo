import { getConnection } from 'typeorm';

import User from '../../../db/entity/user';
import UserSession from '../../../db/entity/userSession';
import logout from './logout';
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
    user = await createUser('testLogout', 'testLogout@test.email', 'pass');
    session = await createSession(user);
  });

  test('When we send refresh token on logout token removed in db', async () => {
    await logout(session);

    expect(
      await UserSession.findOne({ refreshToken: session.refreshToken })
    ).toEqual(undefined);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
