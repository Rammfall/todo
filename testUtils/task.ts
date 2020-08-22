import Project from '../src/db/entity/project';
import Task from '../src/db/entity/task';

export const createTask = async (project: Project, name: string) => {
  const task: Task = new Task();

  task.name = name;
  task.project = project;

  return await task.save();
};
