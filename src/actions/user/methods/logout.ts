import UserSession from '../../../db/entity/userSession';

export default async (refreshToken: string) => {
  const session: UserSession = await UserSession.findOne({ refreshToken });

  if (session) {
    return await session.remove();
  }

  throw new Error('Logout error');
};
