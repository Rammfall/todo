import { getConnection } from 'typeorm';
import validator from 'validator';

import User from '../../../../db/entity/user';
import login from './loginUsername';
import { createUser, deleteUser } from '../../../../../testUtils/user';

describe('Login logic with DB username', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'testLoginUsernameUser',
      'testLoginUsernameUser@login.email',
      'pass'
    );
  });

  test('Success login user with username', async () => {
    const { username } = user;
    const { refreshToken, accessToken } = await login(username, 'pass');

    expect(validator.isUUID(refreshToken, 4)).toEqual(true);
    expect(
      validator.isJWT(accessToken.substring(accessToken.indexOf(' ') + 1))
    ).toEqual(true);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
