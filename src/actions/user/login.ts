import { Response, Request } from 'express';
import validator from 'validator';

import checkEmail from './methods/checkers/checkEmail';
import checkUsername from './methods/checkers/checkUsername';
import loginEmail from './methods/login/loginEmail';
import loginUsername from './methods/login/loginUsername';
import cookieSetter from './methods/cookieSetter';

export default async (req: Request, res: Response) => {
  const { name, password }: { name: string; password: string } = req.body;

  try {
    if (validator.isEmail(name)) {
      if (await checkEmail(name)) {
        const {
          accessToken,
          refreshToken
        }: { accessToken: string; refreshToken: string } = await loginEmail(
          name,
          password
        );

        cookieSetter(res, accessToken, refreshToken);
        res.json({});
      } else {
        res.status(403).json({ info: "Email doesn't exist" });
      }
    } else if (await checkUsername(name)) {
      const {
        accessToken,
        refreshToken
      }: { accessToken: string; refreshToken: string } = await loginUsername(
        name,
        password
      );

      cookieSetter(res, accessToken, refreshToken);
      res.json({});
    } else {
      res.status(403).json({ info: "User doesn't exist" });
    }
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};
