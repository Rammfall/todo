import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

import { jwtAccessSecret, jwtExpiredTime } from '../../../config/application';

export default async (id: number) => {
  const token = sign({ id }, jwtAccessSecret, { expiresIn: jwtExpiredTime });
  const refreshToken = v4();

  return {
    token,
    refreshToken
  };
};
