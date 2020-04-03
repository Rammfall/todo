import { Response } from 'express';

import all from './methods/all';
import { RequestUserData } from '../../interfaces/requestUserData';
import User from '../../db/entity/user';
import Project from '../../db/entity/project';

export default async (req: RequestUserData, res: Response) => {
  const { id }: { id: number } = req.userData;
  const { take, skip }: { take: number; skip: number } = req.query;
  const user: User = await User.findOne({ id });

  try {
    const projects: Project[] = await all(user, take, skip);

    res.json(projects);
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};
