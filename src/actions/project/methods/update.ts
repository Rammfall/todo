import Project from '../../../db/entity/project';

export default async (project: Project, name: string): Promise<Project> => {
  // eslint-disable-next-line no-param-reassign
  project.name = name;

  return await project.save();
};
