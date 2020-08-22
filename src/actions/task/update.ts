import { Response, Request } from 'express';

import update from './methods/update';
import Task from '../../db/entity/task';

const updateHandler = async (req: Request, res: Response): Promise<any> => {
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
  const { id: userId }: { id: number } = req.body.userData;
  const task: Task | undefined = await Task.findOne({
    where: {
      id
    },
    relations: ['project']
  });

  if (task && task.project.userId === userId) {
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

export default updateHandler;
