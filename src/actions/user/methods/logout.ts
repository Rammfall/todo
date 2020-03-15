import UserSession from '../../../db/entity/userSession';

export default async (session: UserSession) => {
  if (session) {
    return await session.remove();
  }

  throw new Error('Logout error');
};
