import { Response, Request } from 'express';

import Project from '../../db/entity/project';
import remove from './methods/remove';

const removeHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: userId }: { id: number } = req.body.userData;
  const { id }: { id: number } = req.body;
  const project: Project | undefined = await Project.findOne({
    where: {
      id,
      userId
    },
    relations: ['user']
  });

  try {
    if (project) {
      const removedProjectName: string = await remove(project);

      res.json({ name: removedProjectName, info: 'removed' });
    } else {
      throw new Error('Cannot remove project');
    }
  } catch (e) {
    res.status(400).json({ info: e.message });
  }
};

export default removeHandler;
