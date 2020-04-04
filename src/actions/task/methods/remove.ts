import Task from '../../../db/entity/task';

export default async (task: Task): Promise<string> => {
  const { name }: { name: string } = task;

  await task.remove();

  return name;
};
