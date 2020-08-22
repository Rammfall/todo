import { compare } from 'bcrypt';

import User from '../../../../db/entity/user';
import login from './login';
import { LoginData } from '../../../../interfaces/loginData';

const loginEmail = async (
  email: string,
  password: string
): Promise<LoginData> => {
  const user: User | undefined = await User.findOne({ email });

  if (user && (await compare(password, user.password))) {
    return await login(user);
  }

  throw new Error('Password is wrong');
};

export default loginEmail;
