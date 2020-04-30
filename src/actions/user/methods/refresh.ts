import { LoginData } from '../../../interfaces/loginData';
import UserSession from '../../../db/entity/userSession';
import User from '../../../db/entity/user';
import login from './login/login';

const refresh = async (session: UserSession): Promise<LoginData> => {
  if (session && +session.expiredDate >= +new Date()) {
    const { user }: { user: User } = session;

    await session.remove();

    return await login(user);
  }

  throw new Error('Token not exist or expired');
};

export default refresh;
