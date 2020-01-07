import { getConnection, getRepository } from 'typeorm';

import UserSession from '../../../db/entity/userSession';
import login from './login';

export default async (refreshToken: string) => {
  const session: UserSession = await getRepository(UserSession)
    .createQueryBuilder('session')
    .where('session.refreshToken = :refreshToken', { refreshToken })
    .leftJoinAndSelect('session.user', 'user')
    .getOne();

  if (session && session.expiredDate >= new Date()) {
    const { user } = session;

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserSession)
      .where('refreshToken = :refreshToken', { refreshToken })
      .execute();

    // eslint-disable-next-line no-return-await
    return await login(user);
  }

  throw new Error('Token not exist or expired');
};
