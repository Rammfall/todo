import UserSession from '../../../db/entity/userSession';

const logout = async (session: UserSession): Promise<UserSession> => {
  if (session) {
    return await session.remove();
  }

  throw new Error('Logout error');
};

export default logout;
