import { getRepository } from 'typeorm';

import UserT from '../../../db/entity/user';

export default async (username: string) => {
  const checkUsername: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();

  return !!checkUsername;
};
