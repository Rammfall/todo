import UserSession from '../../../db/entity/userSession';
import login from './login/login';
import { LoginData } from '../../../interfaces/loginData';
import User from '../../../db/entity/user';

export default async (session: UserSession): Promise<LoginData> => {
  if (session && +session.expiredDate >= +new Date()) {
    const { user }: { user: User } = session;

    await session.remove();

    return await login(user);
  }

  throw new Error('Token not exist or expired');
};
