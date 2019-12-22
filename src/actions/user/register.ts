import { Response, Request } from 'express';
import { hash } from 'bcrypt';

import { bcryptRoundSalt } from '../../config/application';
import checkEmail from './methods/checkEmail';
import checkUsername from './methods/checkUsername';
import createUser from './methods/create';

export default async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashPassword: string = await hash(password, bcryptRoundSalt);

  if (await checkUsername(username)) {
    res.status(403).json({ info: 'Username are exist' });
  } else if (await checkEmail(email)) {
    res.status(403).json({ info: 'Email are exist' });
  } else {
    const user = await createUser(username, email, hashPassword);
    res.json({ user });
  }
};
