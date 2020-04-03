import { Response } from 'express';

import all from './methods/all';
import { RequestUserData } from '../../interfaces/requestUserData';
import Project from '../../db/entity/project';
import Task from '../../db/entity/task';

export default async (req: RequestUserData, res: Response) => {
  const { id: userId }: { id: number } = req.userData;
  const { take, skip }: { take: number; skip: number } = req.query;
  const { id }: { id: number } = req.body;
  const project: Project = await Project.findOne({
    where: {
      id,
      userId
    },
    relations: ['user']
  });

  if (project) {
    const tasks: Task[] = await all(project, take, skip);

    res.json(tasks);
  } else {
    res.status(403).json({ info: 'project does not exist' });
  }
};
