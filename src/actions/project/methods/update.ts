import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';

export default async (id: number, name: string) => {
  const user: User = await User.findOne({ id });
  const project: Project = await Project.findOne({ id: user.id });
  project.name = name;

  return await project.save();
};
