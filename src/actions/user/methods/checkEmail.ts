import { getRepository } from 'typeorm';

import UserT from '../../../db/entity/user';

export default async (email: string) => {
  const checkEmail: UserT = await getRepository(UserT)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();

  return !!checkEmail;
};
