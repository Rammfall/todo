import { getConnection } from 'typeorm';

import create from './create';
import '../../../db';
import getUser from '../../../../testUtils/user/getUser';

describe('Register user(write to DB)', () => {
  const userData = {
    username: 'testUser',
    email: 'test@test.te',
    password: 'pass'
  };

  beforeAll(async () => {
    await getConnection().connect();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test(`Username ${userData.username} was registered`, async () => {
    const { username, email, password } = userData;
    const userResult = await create(username, email, password);
    const { id } = userResult;
    const user = await getUser(id);

    expect(id).toEqual(user.id);
  });
});
