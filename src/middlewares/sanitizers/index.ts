import { NextFunction, Response, Request } from 'express';

import sanitizeStrings from '../../modules/sanitizers';

const sanitize = (req: Request, res: Response, next: NextFunction): any => {
  const data = req.body;
  const keys = Object.keys(data);

  console.log(data);

  keys.map(item => {
    req.body[item] =
      item === 'password'
        ? sanitizeStrings(data[item].toString(), true)
        : sanitizeStrings(data[item].toString());
    return undefined;
  });

  next();
};

export default sanitize;
