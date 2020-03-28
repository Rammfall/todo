import { Response } from 'express';

import update from './methods/update';
import { RequestUserData } from '../../interfaces/requestUserData';
import Project from '../../db/entity/project';
import User from '../../db/entity/user';

export default async (req: RequestUserData, res: Response) => {
  const { id, name } = req.body;
  const { id: userId } = req.userData;
  const user: User = await User.findOne({
    where: {
      id: userId
    }
  });
  const project: Project = await Project.findOne({
    where: {
      id,
      user
    },
    relations: ['user']
  });

  try {
    const updatedProject: Project = await update(project, name);

    res.json({ name: updatedProject.name });
  } catch (e) {
    res.status(500).json({ info: e.message });
  }
};
