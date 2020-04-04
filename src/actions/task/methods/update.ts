import Task from '../../../db/entity/task';

export default async (
  task: Task,
  name?: string,
  description?: string,
  completed?: boolean,
  deadline?: Date
): Promise<Task> => {
  if (name !== undefined) {
    // eslint-disable-next-line no-param-reassign
    task.name = name;
  }
  if (description !== undefined) {
    // eslint-disable-next-line no-param-reassign
    task.description = description;
  }
  if (completed !== undefined) {
    // eslint-disable-next-line no-param-reassign
    task.completed = completed;
  }
  if (deadline !== undefined) {
    // eslint-disable-next-line no-param-reassign
    task.deadline = deadline;
  }

  return await task.save();
};
