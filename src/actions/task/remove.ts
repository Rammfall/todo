import { Response, Request } from 'express';

import Task from '../../db/entity/task';
import remove from './methods/remove';

const removeHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: userId }: { id: number } = req.body.userData;
  const { id }: { id: number } = req.body;
  const task: Task | undefined = await Task.findOne({
    where: {
      id
    },
    relations: ['project']
  });

  if (task && task.project.userId === userId) {
    const removedName: string = await remove(task);

    res.json({ name: removedName, info: 'removed' });
  } else {
    res.status(403).json({ info: 'Task does not exist' });
  }
};

export default removeHandler;
