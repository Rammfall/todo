import { Request, Response } from 'express';

import refresh from './methods/refresh';
import UserSession from '../../db/entity/userSession';
import cookieSetter from './methods/cookieSetter';

export default async (req: Request, res: Response) => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const session: UserSession = await UserSession.findOne({
    where: {
      refreshToken
    },
    relations: ['user']
  });

  try {
    const {
      accessToken,
      refreshToken: newRefresh
    }: { accessToken: string; refreshToken: string } = await refresh(session);

    cookieSetter(res, accessToken, newRefresh);
    res.json({});
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};
