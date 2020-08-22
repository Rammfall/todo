import { Request, Response } from 'express';

import refresh from './methods/refresh';
import UserSession from '../../db/entity/userSession';
import cookieSetter from './methods/cookieSetter';

const refreshHandler = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken }: { refreshToken: string } = req.cookies;
  const session: UserSession | undefined = await UserSession.findOne({
    where: {
      refreshToken
    },
    relations: ['user']
  });

  try {
    if (session) {
      const {
        accessToken,
        refreshToken: newRefresh
      }: { accessToken: string; refreshToken: string } = await refresh(session);

      cookieSetter(res, accessToken, newRefresh);
      res.json({});
    } else {
      throw new Error('Refresh token does not exist');
    }
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};

export default refreshHandler;
