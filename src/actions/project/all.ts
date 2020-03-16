import { Response } from 'express';

import all from './methods/all';
import { RequestUserData } from '../../interfaces/requestUserData';
import User from '../../db/entity/user';

export default async (req: RequestUserData, res: Response) => {
  const { id } = req.userData;
  const { take, skip } = req.query;
  const user: User = await User.findOne({ id });

  try {
    const projects = await all(user, take, skip);

    res.json(projects);
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};
