import { getConnection } from 'typeorm';

import update from './update';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import Task from '../../../db/entity/task';
import { createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import { createTask } from '../../../../testUtils/task';

describe('Update task in db', () => {
  let user: User;
  let project: Project;
  let task: Task;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('updateTask', 'updateTask@tse.te', 'pass');
    project = await createProject(user, 'test');
    task = await createTask(project, 'test');
  });

  test('Task must be updated with name', async () => {
    await update(task, 'true');

    expect(task.name).toEqual('true');
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
