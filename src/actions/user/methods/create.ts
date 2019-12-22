import { getRepository } from 'typeorm';

import UserT from '../../../db/entity/user';

export default async (username: string, email: string, password: string) => {
  const user = await getRepository(UserT)
    .createQueryBuilder('user')
    .insert()
    .into(UserT)
    .values({
      username,
      email,
      password
    })
    .execute();

  return user;
};
