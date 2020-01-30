import User from '../src/db/entity/user';
import login from '../src/actions/user/methods/login';

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

  user.email = email;
  user.username = username;
  user.password = password;

  return await user.save();
};

export const createSession = async (user: User) => {
  const loginResult = await login(user);
  const { session } = loginResult;

  return session;
};
