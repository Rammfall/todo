import { getConnection } from 'typeorm';

import update from './update';
import User from '../../../db/entity/user';
import { createUser, deleteUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import Project from '../../../db/entity/project';

describe('User can to update project', () => {
  let user: User;
  let project: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testUpdateProj', 'testUpdate@te.te', 'pass');
    project = await createProject(user, 'test');
  });

  test('User can to create project', async () => {
    await update(project, 'new test');

    expect(project.name).toEqual('new test');
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
