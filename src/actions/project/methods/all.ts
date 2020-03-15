import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { ordering } from '../../../config/database';

export default async (id: number, take: number = 20, skip: number = 0) => {
  const user = await User.findOne({ id });

  if (user) {
    const projects: Project[] = await Project.find({
      where: {
        user
      },
      take,
      skip,
      order: {
        id: ordering
      }
    });

    return projects;
  }

  throw new Error('User not exist');
};
