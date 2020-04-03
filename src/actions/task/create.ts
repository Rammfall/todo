import { Response } from 'express';

import create from './methods/create';
import { RequestUserData } from '../../interfaces/requestUserData';
import Task from '../../db/entity/task';
import Project from '../../db/entity/project';

export default async (req: RequestUserData, res: Response) => {
  const { id: userId }: { id: number } = req.userData;
  const {
    name,
    description,
    completed,
    deadline,
    id
  }: {
    name: string;
    description: string;
    completed: boolean;
    deadline: Date;
    id: number;
  } = req.body;

  const project: Project = await Project.findOne({
    where: {
      id,
      userId
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
