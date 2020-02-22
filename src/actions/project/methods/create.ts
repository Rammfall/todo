import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';

export default async (id: number, name: string) => {
  const project: Project = new Project();
  project.name = name;
  project.user = await User.findOne({ id });

  return await project.save();
};
