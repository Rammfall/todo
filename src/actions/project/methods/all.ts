import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';

export default async (id: number) => {
  const user = await User.findOne({ id });

  if (user) {
    const projects: Project[] = await Project.find({ user });

    return projects;
  }

  throw new Error('User not exist');
};
