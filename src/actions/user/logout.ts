import { Response, Request } from 'express';

import logout from './methods/logout';
import UserSession from '../../db/entity/userSession';

export default async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const session: UserSession = await UserSession.findOne({
    where: {
      refreshToken
    },
    relations: ['user']
  });

  try {
    await logout(session);
    res.cookie('accessToken', '', { expires: new Date() });
    res.cookie('refreshToken', '', { expires: new Date() });
    res.json({ info: 'logout success' });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};
