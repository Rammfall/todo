import { Request, Response } from 'express';

import refresh from './methods/refresh';
import UserSession from '../../db/entity/userSession';
import { refreshTokenExpired } from '../../config/application';

export default async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const session: UserSession = await UserSession.findOne({
    where: {
      refreshToken
    },
    relations: ['user']
  });

  try {
    const { accessToken, refreshToken: newRefresh } = await refresh(session);

    res.cookie('accessToken', accessToken, {
      maxAge: refreshTokenExpired,
      httpOnly: true
    });
    res.cookie('refreshToken', newRefresh, {
      maxAge: refreshTokenExpired,
      httpOnly: true
    });
    res.json({});
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};
