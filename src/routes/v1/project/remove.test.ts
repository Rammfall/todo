import { getConnection } from 'typeorm';
import request from 'supertest';

import remove from '../../../application';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { createSessionToken, createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';

describe('Remove project', () => {
  let user: User;
  let differentUser: User;
  let token: string;
  let project: Project;
  let differentProject: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'removeProjectApi',
      'removeProjectApi@mail.df',
      'passs'
    );
    differentUser = await createUser(
      'difUsrremoveApi',
      'difUsrremoveApi@test.tes',
      'pass'
    );
    token = await createSessionToken(user);
    project = await createProject(user, 'project');
    differentProject = await createProject(differentUser, 'diffPro');
  });

  test('Removing project on route /api/v1/project/remove/', async () => {
    await request(remove)
      .post('/api/v1/project/remove/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'test', id: project.id });
    const removedProject: Project = await Project.findOne({ id: project.id });

    expect(removedProject).toEqual(undefined);
  });

  test('Removing project different user on route /api/v1/project/remove/ are impossible', async () => {
    await request(remove)
      .post('/api/v1/project/remove/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'test', id: differentProject.id });
    const notRemovedProject: Project = await Project.findOne({
      id: differentProject.id
    });

    expect({ id: differentProject.id, name: differentProject.name }).toEqual({
      id: notRemovedProject.id,
      name: notRemovedProject.name
    });
  });

  afterAll(async () => {
    await user.remove();
    await differentUser.remove();
    await getConnection().close();
  });
});
