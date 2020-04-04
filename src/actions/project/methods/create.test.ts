import { getConnection } from 'typeorm';

import User from '../../../db/entity/user';
import create from './create';
import { createUser, deleteUser } from '../../../../testUtils/user';
import Project from '../../../db/entity/project';

describe('User can to create project', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testCreateProj', 'testCreate@te.te', 'pass');
  });

  test('User can to create own project', async () => {
    const name = 'test';
    const project: Project = await create(user, name);
    const dbProject: Project = await Project.findOne({ user });

    expect(dbProject.name).toEqual(project.name);
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
