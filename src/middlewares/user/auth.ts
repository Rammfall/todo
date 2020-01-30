import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtAccessSecret } from '../../config/application';

interface RequestUserData extends Request {
  userData: object | string;
}

export default (req: RequestUserData, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    req.userData = verify(token, jwtAccessSecret);
    next();
  } catch (e) {
    res.status(401).json({
      message: e.message
    });
  }
};
