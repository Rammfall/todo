import { getConnection } from 'typeorm';

import all from './all';
import User from '../../../db/entity/user';
import { createUser, deleteUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import Project from '../../../db/entity/project';

describe('The user get all own projects', () => {
  let user: User;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('testAllProject', 'testAllMail@mail.gd', 'pass');
    for (let i = 0; i < 30; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createProject(user, `test${i}`);
    }
  });

  test('All own projects to be send', async () => {
    const projects: Project[] = await all(user);

    expect(projects[0].name).toEqual('test29');
    expect(projects[1].name).toEqual('test28');
  });

  test('Test Argument take in function', async () => {
    const projects: Project[] = await all(user, 5);

    expect(projects.length).toEqual(5);
    expect(projects[0].name).toEqual('test29');
    expect(projects[4].name).toEqual('test25');
  });

  test('Test Argument skip in function', async () => {
    const projects: Project[] = await all(user, 5, 5);

    expect(projects.length).toEqual(5);
    expect(projects[0].name).toEqual('test24');
    expect(projects[4].name).toEqual('test20');
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
