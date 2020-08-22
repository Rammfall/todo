import { getConnection } from 'typeorm';

import create from './create';
import User from '../../../db/entity/user';
import { getUser, deleteUser } from '../../../../testUtils/user';

describe('Register user(write to DB)', () => {
  const userData = {
    username: 'testCreateUser',
    email: 'test@create.te',
    password: 'pass'
  };
  let user: User | undefined;

  beforeAll(async () => {
    await getConnection().connect();
  });

  test(`Username ${userData.username} was registered`, async () => {
    const { username, email, password } = userData;
    const userResult = await create(username, email, password);
    const { id } = userResult;
    user = await getUser(id);

    if (user) {
      expect(id).toEqual(user.id);
    }
  });

  afterAll(async () => {
    if (user) await deleteUser(user);
    await getConnection().close();
  });
});
