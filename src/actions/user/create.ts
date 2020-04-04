import { Response, Request } from 'express';

import checkEmail from './methods/checkers/checkEmail';
import checkUsername from './methods/checkers/checkUsername';
import createUser from './methods/create';
import User from '../../db/entity/user';

export default async (req: Request, res: Response) => {
  const {
    username,
    email,
    password
  }: { username: string; email: string; password: string } = req.body;

  if (await checkUsername(username)) {
    res.status(403).json({ info: 'Username are exist' });
  } else if (await checkEmail(email)) {
    res.status(403).json({ info: 'Email are exist' });
  } else {
    const user: User = await createUser(username, email, password);
    res.json({ username: user.username, email: user.email, id: user.id });
  }
};
