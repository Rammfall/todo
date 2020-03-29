import Project from '../../../db/entity/project';
import Task from '../../../db/entity/task';
import { ordering } from '../../../config/database';

export default async (
  project: Project,
  take: number = 20,
  skip: number = 0
): Promise<Task[]> => {
  const normalizedTake = take > 50 ? 50 : take;

  const tasks: Task[] = await Task.find({
    where: {
      project
    },
    take: normalizedTake,
    skip,
    order: {
      id: ordering
    }
  });

  return tasks;
};
