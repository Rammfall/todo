import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { RequestUserDataJwt } from '../../interfaces/requestUserData';
import { jwtAccessSecret } from '../../config/application';

export default (req: RequestUserDataJwt, res: Response, next: NextFunction) => {
  try {
    const token: string = req.cookies.accessToken.split(' ')[1];

    req.userData = verify(token, jwtAccessSecret);
    next();
  } catch (e) {
    res.status(401).json({
      message: e.message
    });
  }
};
