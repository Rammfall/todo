import { getConnection } from 'typeorm';
import validator from 'validator';

import User from '../../../../db/entity/user';
import login from './loginEmail';
import { createUser, deleteUser } from '../../../../../testUtils/user';

describe('Login logic with DB email', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'testLoginEmailUser',
      'testLoginEmailUser@login.email',
      'pass'
    );
  });

  test('Success login user', async () => {
    const { email } = user;
    const { refreshToken, accessToken } = await login(email, 'pass');

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
