import Project from '../../../db/entity/project';

const remove = async (project: Project): Promise<string> => {
  const { name }: { name: string } = project;
  await project.remove();

  return name;
};

export default remove;
