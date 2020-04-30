import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

import {
  jwtAccessExpiredTime,
  jwtAccessSecret,
  jwtAccessTokenWord,
  refreshTokenExpired
} from '../../../../config/application';
import tokenizer from '../utils/tokenizer';
import UserSession from '../../../../db/entity/userSession';
import User from '../../../../db/entity/user';
import { LoginData } from '../../../../interfaces/loginData';

const login = async (
  user: User,
  expired: number = refreshTokenExpired,
  expiredAccessToken: string = jwtAccessExpiredTime
): Promise<LoginData> => {
  const { id, username }: { id: number; username: string } = user;
  const accessToken: string = sign({ id, username }, jwtAccessSecret, {
    expiresIn: expiredAccessToken
  });
  const refreshToken: string = v4();
  const tempDate: Date = new Date();
  const expiredDate: Date = new Date(
    tempDate.setTime(tempDate.getTime() + +expired)
  );
  const session: UserSession = new UserSession();

  session.expiredDate = expiredDate;
  session.refreshToken = refreshToken;
  session.user = user;

  const savedSession: UserSession = await session.save();

  return {
    accessToken: tokenizer(accessToken, jwtAccessTokenWord),
    refreshToken: savedSession.refreshToken,
    session
  };
};

export default login;
