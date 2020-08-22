import { getConnection } from 'typeorm';
import request from 'supertest';

import update from '../../../application';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { createSessionToken, createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';

describe('Update project', () => {
  let user: User;
  let differentUser: User;
  let token: string;
  let project: Project;
  let differentProject: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'updateProjectApi',
      'updateProjectApi@mail.df',
      'passs'
    );
    differentUser = await createUser(
      'difUsrU1pdateApi',
      'difUsrUpd1ateApi@test.tes',
      'pass'
    );
    token = await createSessionToken(user);
    project = await createProject(user, 'project');
    differentProject = await createProject(differentUser, 'diffPro');
  });

  test('Updating project on route /api/v1/project/update/', async () => {
    await request(update)
      .post('/api/v1/project/update/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'test', id: project.id });
    const updatedProject: Project | undefined = await Project.findOne({
      id: project.id
    });

    if (updatedProject) {
      expect({ id: project.id, name: 'test' }).toEqual({
        id: updatedProject.id,
        name: updatedProject.name
      });
    }
  });

  test('Updating project different user on route /api/v1/project/update/ are impossible', async () => {
    await request(update)
      .post('/api/v1/project/update/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'test', id: differentProject.id });

    expect({ id: differentProject.id, name: differentProject.name }).toEqual({
      id: differentProject.id,
      name: 'diffPro'
    });
  });

  afterAll(async () => {
    await user.remove();
    await differentUser.remove();
    await getConnection().close();
  });
});
