import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';

import UserT from '../../../db/entity/user';
import login from './login';

export default async (email: string, password: string) => {
  const user: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();
  const { id, username } = user;

  if (await compare(password, user.password)) {
    // eslint-disable-next-line no-return-await
    return await login(id, username);
  }

  throw new Error('Password is wrong');
};
