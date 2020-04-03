import { Response } from 'express';
import { refreshTokenExpired } from '../../../config/application';

export default (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    maxAge: refreshTokenExpired,
    httpOnly: true
  });
  res.cookie('refreshToken', refreshToken, {
    maxAge: refreshTokenExpired,
    httpOnly: true
  });
};
