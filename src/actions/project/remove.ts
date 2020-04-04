import { Response } from 'express';

import { RequestUserData } from '../../interfaces/requestUserData';
import Project from '../../db/entity/project';
import remove from './methods/remove';

export default async (req: RequestUserData, res: Response) => {
  const { id: userId }: { id: number } = req.userData;
  const { id }: { id: number } = req.body;
  const project: Project = await Project.findOne({
    where: {
      id,
      userId
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
