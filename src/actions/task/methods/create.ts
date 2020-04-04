import Task from '../../../db/entity/task';
import Project from '../../../db/entity/project';

export default async (
  project: Project,
  name: string,
  description?: string,
  completed?: boolean,
  deadline?: Date
): Promise<Task> => {
  const task: Task = new Task();

  task.name = name;
  task.description = description;
  task.completed = completed;
  task.deadline = deadline;
  task.project = project;

  return await task.save();
};
