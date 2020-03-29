import { Response } from 'express';

import all from './methods/all';
import { RequestUserData } from '../../interfaces/requestUserData';
import User from '../../db/entity/user';
import Project from '../../db/entity/project';
import Task from '../../db/entity/task';

export default async (req: RequestUserData, res: Response) => {
  const { id: userId } = req.userData;
  const { take, skip } = req.query;
  const { id } = req.body;
  const user: User = await User.findOne({ id: userId });
  const project: Project = await Project.findOne({
    where: {
      id,
      user
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
