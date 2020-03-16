import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { ordering } from '../../../config/database';

export default async (user: User, take: number = 20, skip: number = 0) => {
  const takeCount = take > 50 ? 50 : take;

  if (user) {
    const projects: Project[] = await Project.find({
      where: {
        user
      },
      take: takeCount,
      skip,
      order: {
        id: ordering
      }
    });

    return projects;
  }

  throw new Error('User not exist');
};
