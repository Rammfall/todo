import { getConnection } from 'typeorm';

import checkUsername from './checkUsername';
import User from '../../../db/entity/user';
import { createUser, deleteUser } from '../../../../testUtils/user';

describe('Check user exist on email', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'testCheckUsername',
      'testCheckUsername@test.te',
      'pass'
    );
  });

  test('If exist return true', async () => {
    const { username } = user;

    expect(await checkUsername(username)).toEqual(true);
    expect(await checkUsername('notExistMail')).toEqual(false);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
