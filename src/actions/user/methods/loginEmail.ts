import { compare } from 'bcrypt';

import User from '../../../db/entity/user';
import login from './login';

export default async (email: string, password: string) => {
  const user: User = await User.findOne({ email });

  if (await compare(password, user.password)) {
    return await login(user);
  }

  throw new Error('Password is wrong');
};
