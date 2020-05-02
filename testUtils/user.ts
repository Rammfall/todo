import { hash } from 'bcrypt';

import User from '../src/db/entity/user';
import login from '../src/actions/user/methods/login/login';
import { bcryptRoundSalt } from '../src/config/application';
import UserSession from '../src/db/entity/userSession';
import { LoginData } from '../src/interfaces/loginData';

export const getUser = async (id: number): Promise<User | undefined> => {
  return await User.findOne({ id });
};

export const deleteUser = async (user: User): Promise<User> => {
  return await user.remove();
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const user: User = new User();
  const hashPassword: string = await hash(password, bcryptRoundSalt);

  user.email = email;
  user.username = username;
  user.password = hashPassword;

  return await user.save();
};

export const createSession = async (
  user: User,
  expired?: number,
  expiredAccessToken?: string
): Promise<UserSession> => {
  const loginResult: LoginData = await login(user, expired, expiredAccessToken);
  const { session }: { session: UserSession } = loginResult;

  return session;
};

export const createSessionToken = async (
  user: User,
  expired?: string
): Promise<string> => {
  const loginResult: LoginData = await login(user, undefined, expired);
  const { accessToken }: { accessToken: string } = loginResult;

  return accessToken;
};
