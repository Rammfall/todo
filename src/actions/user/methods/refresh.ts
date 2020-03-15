import UserSession from '../../../db/entity/userSession';
import login from './login/login';

export default async (session: UserSession) => {
  if (session && session.expiredDate >= new Date()) {
    const { user } = session;

    await session.remove();

    return await login(user);
  }

  throw new Error('Token not exist or expired');
};
