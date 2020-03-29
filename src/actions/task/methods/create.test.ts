import { getConnection } from 'typeorm';

import create from './create';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import Task from '../../../db/entity/task';
import { createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';

describe('Check creating task in db', () => {
  let user: User;
  let project: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('task', 'task@task.te', 'pass');
    project = await createProject(user, 'test');
  });

  test('Task will be created in db and relate to current project with only required arguments', async () => {
    const task: Task = await create(project, 'test');

    expect(task.project.id).toEqual(project.id);
    expect(task.name).toEqual('test');
    expect(task.completed).toEqual(false);
  });

  test('Task will be created in db and relate to current project with full arguments', async () => {
    const task: Task = await create(
      project,
      'test',
      'description',
      true,
      new Date('2012-03-01')
    );

    expect(task.project.id).toEqual(project.id);
    expect(task.name).toEqual('test');
    expect(task.completed).toEqual(true);
    expect(task.description).toEqual('description');
    expect(task.deadline).toEqual(new Date('2012-03-01'));
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
