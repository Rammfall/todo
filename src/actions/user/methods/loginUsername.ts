import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';

import UserT from '../../../db/entity/user';

export default async (username: string, password: string) => {
  const user: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();

  // eslint-disable-next-line no-return-await
  return await compare(password, user.password);
};
