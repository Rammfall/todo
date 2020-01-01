import { sign } from 'jsonwebtoken';

import {
  jwtAccessSecret,
  jwtAccessExpiredTime,
  jwtRefreshSecret,
  jwtRefreshExpiredTime,
  jwtAccessTokenWord,
  jwtRefreshTokenWord
} from '../../../config/application';
import tokenizer from './utils/tokenizer';

export default async (id: number, username: string) => {
  const token: string = sign({ id, username }, jwtAccessSecret, {
    expiresIn: jwtAccessExpiredTime
  });
  const refreshToken: string = sign({ id, username }, jwtRefreshSecret, {
    expiresIn: jwtRefreshExpiredTime
  });

  return {
    token: tokenizer(token, jwtAccessTokenWord),
    refreshToken: tokenizer(refreshToken, jwtRefreshTokenWord)
  };
};
