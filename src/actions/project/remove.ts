import { Response } from 'express';

import { RequestUserData } from '../../interfaces/requestUserData';
import User from '../../db/entity/user';
import Project from '../../db/entity/project';
import remove from './methods/remove';

export default async (req: RequestUserData, res: Response) => {
  const { id } = req.userData;
  const { id: projectId } = req.body;
  const user: User = await User.findOne({ id });
  const project: Project = await Project.findOne({
    where: {
      id: projectId,
      user
    },
    relations: ['user']
  });

  try {
    const removedProjectName: string = await remove(project);

    res.json({ name: removedProjectName, info: 'removed' });
  } catch (e) {
    res.status(400).json({ info: e.message });
  }
};
