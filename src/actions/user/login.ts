import { Response, Request } from 'express';
import validator from 'validator';

import checkEmail from './methods/checkEmail';
import checkUsername from './methods/checkUsername';
import loginEmail from './methods/loginEmail';
import loginUsername from './methods/loginUsername';

export default async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (validator.isEmail(name)) {
    if (await checkEmail(name)) {
      try {
        const auth = await loginEmail(name, password);

        res.json({ auth });
      } catch (e) {
        res.status(403).json({ info: e.message });
      }
    } else {
      res.status(403).json({ info: "Email doesn't exist" });
    }
  } else if (await checkUsername(name)) {
    try {
      const auth = await loginUsername(name, password);

      res.json({ auth });
    } catch (e) {
      res.status(403).json({ info: e.message });
    }
  } else {
    res.status(403).json({ info: "Username doesn't exist" });
  }
};
