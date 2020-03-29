import { Response } from 'express';

import create from './methods/create';
import { RequestUserData } from '../../interfaces/requestUserData';
import User from '../../db/entity/user';
import Task from '../../db/entity/task';
import Project from '../../db/entity/project';

export default async (req: RequestUserData, res: Response) => {
  const { id: userId } = req.userData;
  const { name, description, completed, deadline, id } = req.body;

  const user: User = await User.findOne({ id: userId });
  const project: Project = await Project.findOne({
    where: {
      id,
      user
    },
    relations: ['user']
  });

  if (project) {
    const task: Task = await create(
      project,
      name,
      description,
      completed,
      deadline
    );

    res.send({
      id: task.id,
      name: task.name,
      description: task.description,
      completed: task.completed,
      deadline: task.deadline
    });
  } else {
    res.status(403).json({ info: 'Project is not exist' });
  }
};
