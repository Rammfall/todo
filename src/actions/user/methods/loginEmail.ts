import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';

import UserT from '../../../db/entity/user';

export default async (email: string, password: string) => {
  const user: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();

  // eslint-disable-next-line no-return-await
  return await compare(password, user.password);
};
