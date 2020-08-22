import { Response, Request } from 'express';

import create from './methods/create';
import User from '../../db/entity/user';
import Project from '../../db/entity/project';

const createHandler = async (req: Request, res: Response): Promise<any> => {
  const { name }: { name: string } = req.body;
  const { id }: { id: number } = req.body.userData;
  const user: User | undefined = await User.findOne({ id });

  if (user) {
    const project: Project = await create(user, name);

    res.json({ id: project.id, name: project.name });
  } else {
    res.status(403).json({ info: 'Cannot create project' });
  }
};

export default createHandler;
