import { getConnection } from 'typeorm';

import all from './all';
import User from '../../../db/entity/user';
import { createUser, deleteUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import Project from '../../../db/entity/project';
import { createTask } from '../../../../testUtils/task';
import Task from '../../../db/entity/task';

describe('The user get all own tasks for project', () => {
  let user: User;
  let project: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testAllTask', 'testAllTask@mail.gd', 'pass');
    project = await createProject(user, 'test');
    for (let i = 0; i < 30; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createTask(project, `test${i}`);
    }
  });

  test('All own tasks to be send', async () => {
    const tasks: Task[] = await all(project);

    expect(tasks[0].name).toEqual('test29');
    expect(tasks[1].name).toEqual('test28');
  });

  test('Test Argument take in function', async () => {
    const tasks: Task[] = await all(project, 5);

    expect(tasks.length).toEqual(5);
    expect(tasks[0].name).toEqual('test29');
    expect(tasks[4].name).toEqual('test25');
  });

  test('Test Argument skip in function', async () => {
    const tasks: Task[] = await all(project, 5, 5);

    expect(tasks.length).toEqual(5);
    expect(tasks[0].name).toEqual('test24');
    expect(tasks[4].name).toEqual('test20');
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
