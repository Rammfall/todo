import { hash } from 'bcrypt';

import User from '../src/db/entity/user';
import login from '../src/actions/user/methods/login/login';
import { bcryptRoundSalt } from '../src/config/application';

export const getUser = async (id: number) => {
  return await User.findOne({ id });
};

export const deleteUser = async (user: User) => {
  return await user.remove();
};

export const createUser = async (
  username: string = 'test',
  email: string = 'test@test.te',
  password: string = 'pass'
) => {
  const user: User = new User();
  const hashPassword: string = await hash(password, bcryptRoundSalt);

  user.email = email;
  user.username = username;
  user.password = hashPassword;

  return await user.save();
};

export const createSession = async (user: User) => {
  const loginResult = await login(user);
  const { session } = loginResult;

  return session;
};
