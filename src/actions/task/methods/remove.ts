import Task from '../../../db/entity/task';

const remove = async (task: Task): Promise<string> => {
  const { name }: { name: string } = task;

  await task.remove();

  return name;
};

export default remove;
