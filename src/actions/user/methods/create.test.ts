import { getConnection } from 'typeorm';

import create from './create';
import getUser from '../../../../testUtils/user/getUser';
import deleteUser from '../../../../testUtils/user/deleteUser';
import User from '../../../db/entity/user';

describe('Register user(write to DB)', () => {
  const userData = {
    username: 'testUser',
    email: 'test@test.te',
    password: 'pass'
  };
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
  });

  test(`Username ${userData.username} was registered`, async () => {
    const { username, email, password } = userData;
    const userResult = await create(username, email, password);
    const { id } = userResult;
    user = await getUser(id);

    expect(id).toEqual(user.id);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
