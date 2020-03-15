import { compare } from 'bcrypt';

import User from '../../../../db/entity/user';
import login from './login';

export default async (username: string, password: string) => {
  const user: User = await User.findOne({ username });

  if (await compare(password, user.password)) {
    return await login(user);
  }

  throw new Error('Password is wrong');
};
