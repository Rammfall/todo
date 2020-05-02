import { Response } from 'express';

import { refreshTokenExpired } from '../../../config/application';

const cookieSetter = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie('accessToken', accessToken, {
    maxAge: refreshTokenExpired,
    httpOnly: true
  });
  res.cookie('refreshToken', refreshToken, {
    maxAge: refreshTokenExpired,
    httpOnly: true
  });
};

export default cookieSetter;
