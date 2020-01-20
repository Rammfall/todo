import { getConnection } from 'typeorm';

import checkUsername from './checkUsername';
import User from '../../../db/entity/user';
import createUser from '../../../../testUtils/user/createUser';
import deleteUser from '../../../../testUtils/user/deleteUser';

describe('Check user exist on email', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testCheckEMail', 'testCheck@test.te', 'pass');
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
