import { getConnection } from 'typeorm';

import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import Task from '../../../db/entity/task';
import { createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import { createTask } from '../../../../testUtils/task';
import remove from './remove';

describe('Check removing task from db', () => {
  let user: User;
  let project: Project;
  let task: Task;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('removeTask', 'removeTask@tes.tes', 'pass');
    project = await createProject(user, 'test');
    task = await createTask(project, 'test');
  });

  test('Task should be removed', async () => {
    const result = await remove(task);
    const removedTask: Task = await Task.findOne({ id: task.id });

    expect(result).toEqual(task.name);
    expect(removedTask).toEqual(undefined);
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
