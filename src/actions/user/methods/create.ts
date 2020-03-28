import { hash } from 'bcrypt';

import User from '../../../db/entity/user';
import { bcryptRoundSalt } from '../../../config/application';

export default async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const user: User = new User();
  const hashPassword: string = await hash(password, bcryptRoundSalt);

  user.username = username;
  user.email = email;
  user.password = hashPassword;

  return await user.save();
};
