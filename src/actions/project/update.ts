import { Response } from 'express';

import update from './methods/update';
import { RequestUserData } from '../../interfaces/requestUserData';
import Project from '../../db/entity/project';

export default async (req: RequestUserData, res: Response) => {
  const { id, name }: { id: number; name: string } = req.body;
  const { id: userId }: { id: number } = req.userData;
  const project: Project = await Project.findOne({
    where: {
      id,
      userId
    },
    relations: ['user']
  });

  try {
    const updatedProject: Project = await update(project, name);

    res.json({ name: updatedProject.name });
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};
