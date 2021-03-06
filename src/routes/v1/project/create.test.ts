import { getConnection } from 'typeorm';
import request from 'supertest';

import create from '../../../application';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { createSessionToken, createUser } from '../../../../testUtils/user';

describe('Create project', () => {
  let user: User;
  let token: string;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'createProjectApi',
      'createProjectApi@mail.df',
      'passs'
    );
    token = await createSessionToken(user);
  });

  test('Creating project on route /api/v1/project/create/', async () => {
    const result = await request(create)
      .post('/api/v1/project/create/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'apiCreateProject' });
    const project: Project | undefined = await Project.findOne({
      user
    });

    if (project) {
      expect(result.body).toEqual({ id: project.id, name: project.name });
    }
  });

  test('Creating project on protected route', async () => {
    const accessToken: string = await createSessionToken(user, '1ms');
    const result = await request(create)
      .post('/api/v1/project/create/')
      .set('Cookie', [`accessToken=${accessToken}`])
      .send({ name: 'apiCreateProject' });

    expect(result.status).toEqual(401);
    expect(result.body.info).toEqual('jwt expired');
  });

  afterAll(async () => {
    await user.remove();
    await getConnection().close();
  });
});
