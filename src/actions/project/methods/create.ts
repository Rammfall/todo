import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';

export default async (user: User, name: string) => {
  const project: Project = new Project();
  project.name = name;
  project.user = user;

  return await project.save();
};
