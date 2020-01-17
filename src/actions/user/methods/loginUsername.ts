import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';

import UserT from '../../../db/entity/user';
import login from './login';

export default async (username: string, password: string) => {
  const user: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();

  if (await compare(password, user.password)) {
    return await login(user);
  }

  throw new Error('Password is wrong');
};
