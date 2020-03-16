import Project from '../../../db/entity/project';

export default async (project: Project) => {
  const { name } = project;
  await project.remove();

  return name;
};
