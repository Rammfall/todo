import { Response, Request } from 'express';
import validator from 'validator';

import logout from './methods/logout';
import UserSession from '../../db/entity/userSession';
import cookieSetter from './methods/cookieSetter';

const logoutHandler = async (req: Request, res: Response) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  if (!validator.isUUID(refreshToken)) {
    res.status(500).json({ info: 'Not valid token' });
    return;
  }

  const session: UserSession | undefined = await UserSession.findOne({
    where: {
      refreshToken
    },
    relations: ['user']
  });

  try {
    if (session) {
      await logout(session);
      cookieSetter(res, '', '');
      res.json({ info: 'logout success' });
    } else {
      throw new Error('Session not exist');
    }
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};

export default logoutHandler;
