import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';

import {
  jwtAccessSecret,
  jwtAccessExpiredTime,
  jwtAccessTokenWord,
  refreshTokenExpired
} from '../../../config/application';
import tokenizer from './utils/tokenizer';
import UserSession from '../../../db/entity/userSession';
import User from '../../../db/entity/user';

export default async (user: User) => {
  const { id, username } = user;
  const accessToken: string = sign({ id, username }, jwtAccessSecret, {
    expiresIn: jwtAccessExpiredTime
  });
  const refreshToken: string = v4();
  const tempDate: Date = new Date();
  const expiredDate: Date = new Date(
    tempDate.setTime(tempDate.getTime() + +refreshTokenExpired)
  );

  await getRepository(UserSession)
    .createQueryBuilder('session')
    .insert()
    .into(UserSession)
    .values({
      refreshToken,
      expiredDate,
      user
    })
    .execute();

  return {
    accessToken: tokenizer(accessToken, jwtAccessTokenWord),
    refreshToken
  };
};
