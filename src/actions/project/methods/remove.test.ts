import { getConnection } from 'typeorm';

import remove from './remove';
import User from '../../../db/entity/user';
import { createUser } from '../../../../testUtils/user';
import Project from '../../../db/entity/project';
import { createProject } from '../../../../testUtils/project';

describe('Removing project', () => {
  let user: User;
  let project: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('removeProject', 'removeProject@test.te', 'pass');
    project = await createProject(user, 'test');
  });

  test('Project must be removed', async () => {
    const name = await remove(project);

    expect(name).toEqual('test');
    expect(await Project.findOne({ id: project.id })).toEqual(undefined);
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
