import { Response } from 'express';

import update from './methods/update';
import { RequestUserData } from '../../interfaces/requestUserData';
import Task from '../../db/entity/task';

export default async (req: RequestUserData, res: Response) => {
  const {
    id,
    name,
    description,
    completed,
    deadline
  }: {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    deadline: Date;
  } = req.body;
  const { id: userId }: { id: number } = req.userData;
  const task: Task = await Task.findOne({
    where: {
      id
    },
    relations: ['project']
  });

  if (task.project.userId === userId) {
    const updatedTask: Task = await update(
      task,
      name,
      description,
      completed,
      deadline
    );

    res.json(updatedTask);
  } else {
    res.status(403).json({ info: 'Task does not exist' });
  }
};
