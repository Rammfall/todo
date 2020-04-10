import { hash, genSalt } from 'bcrypt';

import User from '../../../db/entity/user';
import { bcryptRoundSalt } from '../../../config/application';

export default async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const user: User = new User();
  const salt: string = await genSalt(bcryptRoundSalt);
  const hashPassword: string = await hash(password, salt);

  user.username = username;
  user.email = email;
  user.password = hashPassword;

  return await user.save();
};
