import { getConnection } from 'typeorm';

import User from '../../src/db/entity/user';

const getUser = async (id: number) => {
  return await getConnection()
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.id = :id', { id })
    .getOne();
};

export default getUser;
