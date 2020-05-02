import { Response, Request } from 'express';

import update from './methods/update';
import Project from '../../db/entity/project';

const updateHandler = async (req: Request, res: Response): Promise<any> => {
  const { id, name }: { id: number; name: string } = req.body;
  const { id: userId }: { id: number } = req.body.userData;
  const project: Project | undefined = await Project.findOne({
    where: {
      id,
      userId
    },
    relations: ['user']
  });

  try {
    if (project) {
      const updatedProject: Project = await update(project, name);

      res.json({ name: updatedProject.name });
    } else {
      throw new Error('Cannot update project');
    }
  } catch (e) {
    res.status(403).json({ info: e.message });
  }
};

export default updateHandler;
