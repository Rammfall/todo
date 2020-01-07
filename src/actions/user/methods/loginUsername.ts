import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';

import UserT from '../../../db/entity/user';
import login from './login';

export default async (username: string, password: string) => {
  const user: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();
  const { id } = user;

  if (await compare(password, user.password)) {
    // eslint-disable-next-line no-return-await
    return await login(id);
  }

  throw new Error('Password is wrong');
};
