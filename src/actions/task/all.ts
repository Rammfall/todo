import { Response, Request } from 'express';

import all from './methods/all';
import Project from '../../db/entity/project';
import Task from '../../db/entity/task';

const allHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: userId }: { id: number } = req.body.userData;
  const { take, skip }: { take: number; skip: number } = req.query;
  const { id }: { id: number } = req.body;
  const project: Project | undefined = await Project.findOne({
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
    res.status(404).json({ info: 'project does not exist' });
  }
};

export default allHandler;
