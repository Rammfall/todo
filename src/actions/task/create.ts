import { Response, Request } from 'express';

import create from './methods/create';
import Task from '../../db/entity/task';
import Project from '../../db/entity/project';

const createHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: userId }: { id: number } = req.body.userData;
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

  const project: Project | undefined = await Project.findOne({
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

export default createHandler;
