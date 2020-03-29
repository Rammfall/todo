import { Response } from 'express';

import { RequestUserData } from '../../interfaces/requestUserData';
import Task from '../../db/entity/task';
import remove from './methods/remove';

export default async (req: RequestUserData, res: Response) => {
  const { id: userId } = req.userData;
  const { id } = req.body;
  const task: Task = await Task.findOne({
    where: {
      id
    },
    relations: ['project']
  });

  if (task.project.userId === userId) {
    const removedName: string = await remove(task);

    res.json({ name: removedName, info: 'removed' });
  } else {
    res.status(403).json({ info: 'Task does not exist' });
  }
};
