import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';

import {
  jwtAccessSecret,
  jwtAccessExpiredTime,
  jwtAccessTokenWord
} from '../../../config/application';
import tokenizer from './utils/tokenizer';
import UserSession from '../../../db/entity/userSession';

export default async (id: number, username: string) => {
  const accessToken: string = sign({ id, username }, jwtAccessSecret, {
    expiresIn: jwtAccessExpiredTime
  });
  const refreshToken: string = v4();
  await getRepository(UserSession)
    .createQueryBuilder('session')
    .insert()
    .into(UserSession)
    .values({
      refreshToken,
      expiredDate: new Date(),
      user: id
    })
    .execute();

  return {
    accessToken: tokenizer(accessToken, jwtAccessTokenWord),
    refreshToken
  };
};
