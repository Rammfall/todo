import { Response, Request } from 'express';
import validator from 'validator';

import logout from './methods/logout';
import UserSession from '../../db/entity/userSession';
import cookieSetter from './methods/cookieSetter';

export default async (req: Request, res: Response) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  if (!validator.isUUID(refreshToken)) {
    res.status(500).json({ info: 'Not valid token' });
    return;
  }

  const session: UserSession = await UserSession.findOne({
    where: {
      refreshToken
    },
    relations: ['user']
  });

  try {
    await logout(session);
    cookieSetter(res, '', '');
    res.json({ info: 'logout success' });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};
