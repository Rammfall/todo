import Project from '../src/db/entity/project';
import User from '../src/db/entity/user';

// eslint-disable-next-line import/prefer-default-export
export const createProject = async (user: User, name: string) => {
  const project = new Project();
  project.name = name;
  project.user = user;
  return await project.save();
};
