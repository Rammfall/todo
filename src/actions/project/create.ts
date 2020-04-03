import { Response } from 'express';

import create from './methods/create';
import { RequestUserData } from '../../interfaces/requestUserData';
import User from '../../db/entity/user';
import Project from '../../db/entity/project';

export default async (req: RequestUserData, res: Response) => {
  const { name }: { name: string } = req.body;
  const { id }: { id: number } = req.userData;
  const user: User = await User.findOne({ id });

  try {
    const project: Project = await create(user, name);

    res.json({ id: project.id, name: project.name });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};
