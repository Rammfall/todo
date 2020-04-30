import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';

const create = async (user: User, name: string): Promise<Project> => {
  const project: Project = new Project();
  project.name = name;
  project.user = user;

  return await project.save();
};

export default create;
