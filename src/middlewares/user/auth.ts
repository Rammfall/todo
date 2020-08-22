import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtAccessSecret } from '../../config/application';

const auth = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const token: string = req.cookies.accessToken.split(' ')[1];

    req.body.userData = verify(token, jwtAccessSecret);
    next();
  } catch (e) {
    res.status(401).json({
      info: e.message
    });
  }
};

export default auth;
