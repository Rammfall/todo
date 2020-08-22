import { compare } from 'bcrypt';

import User from '../../../../db/entity/user';
import login from './login';
import { LoginData } from '../../../../interfaces/loginData';

const loginUsername = async (
  username: string,
  password: string
): Promise<LoginData> => {
  const user: User | undefined = await User.findOne({ username });

  if (user && (await compare(password, user.password))) {
    return await login(user);
  }

  throw new Error('Password is wrong');
};

export default loginUsername;
