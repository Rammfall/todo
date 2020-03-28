import Project from '../../../db/entity/project';

export default async (project: Project): Promise<string> => {
  const { name } = project;
  await project.remove();

  return name;
};
