import User from '../../src/db/entity/user';
import login from '../../src/actions/user/methods/login';

export default async (user: User) => {
  const loginResult = await login(user);
  const { session } = loginResult;

  return session;
};
