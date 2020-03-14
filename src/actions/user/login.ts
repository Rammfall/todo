import { Response, Request } from 'express';
import validator from 'validator';

import checkEmail from './methods/checkers/checkEmail';
import checkUsername from './methods/checkers/checkUsername';
import loginEmail from './methods/login/loginEmail';
import loginUsername from './methods/login/loginUsername';
import { refreshTokenExpired } from '../../config/application';

export default async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (validator.isEmail(name)) {
    if (await checkEmail(name)) {
      try {
        const auth = await loginEmail(name, password);
        const { accessToken, refreshToken } = auth;

        res.cookie('accessToken', accessToken, {
          maxAge: refreshTokenExpired,
          httpOnly: true
        });
        res.cookie('refreshToken', refreshToken, {
          maxAge: refreshTokenExpired,
          httpOnly: true
        });
        res.json({});
      } catch (e) {
        res.status(403).json({ info: e.message });
      }
    } else {
      res.status(403).json({ info: "Email doesn't exist" });
    }
  } else if (await checkUsername(name)) {
    try {
      const auth = await loginUsername(name, password);
      const { accessToken, refreshToken } = auth;

      res.cookie('accessToken', accessToken, {
        maxAge: refreshTokenExpired,
        httpOnly: true
      });
      res.cookie('refreshToken', refreshToken, {
        maxAge: refreshTokenExpired,
        httpOnly: true
      });
      res.json({});
    } catch (e) {
      res.status(403).json({ info: e.message });
    }
  } else {
    res.status(403).json({ info: "User doesn't exist" });
  }
};
