import { Response, Request } from 'express';

import all from './methods/all';
import User from '../../db/entity/user';
import Project from '../../db/entity/project';

const allHandler = async (req: Request, res: Response): Promise<any> => {
  const { id }: { id: number } = req.body.userData;
  const { take, skip }: { take: number; skip: number } = req.query;
  const user: User | undefined = await User.findOne({ id });
  if (user) {
    const projects: Project[] = await all(user, take, skip);

    res.json(projects);
  } else {
    res.status(403).json({ info: 'Cannot get projects' });
  }
};

export default allHandler;
