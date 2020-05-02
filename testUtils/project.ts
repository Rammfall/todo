import Project from '../src/db/entity/project';
import User from '../src/db/entity/user';

export const createProject = async (user: User, name: string) => {
  const project = new Project();
  project.name = name;
  project.user = user;
  return await project.save();
};
