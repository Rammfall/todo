import { getConnection } from 'typeorm';
import request from 'supertest';

import app from '../../../application';
import User from '../../../db/entity/user';
import {
  createSessionToken,
  createUser,
  deleteUser
} from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import Project from '../../../db/entity/project';
import { createTask } from '../../../../testUtils/task';

describe('Getting tasks on api /api/v1/task/all/', () => {
  let user: User;
  let token: string;
  let project: Project;
  let diffUser: User;
  let diffProject: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('allTasksApi', 'allTasksApi@email.test', 'pass');
    project = await createProject(user, 'test');
    token = await createSessionToken(user);
    for (let i = 0; i < 51; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createTask(project, `test${i}`);
    }
    diffUser = await createUser(
      'diffUserallTasksApi',
      'diffUserallTasksApi@email.test',
      'pass'
    );
    diffProject = await createProject(diffUser, 'test');
    await createTask(diffProject, 'apiTest');
  });

  test('Get first 20 projects without params', async () => {
    const result = await request(app)
      .post('/api/v1/task/all/')
      .send({ id: project.id })
      .set('Cookie', [`accessToken=${token}`]);
    const data = result.body;

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(20);
    expect(data[0].name).toEqual('test50');
  });

  test('Get first 50 projects with params', async () => {
    const result = await request(app)
      .post('/api/v1/task/all/?take=51')
      .send({ id: project.id })
      .set('Cookie', [`accessToken=${token}`]);
    const data = result.body;

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(50);
    expect(data[0].name).toEqual('test50');
  });

  test('Get first 5 projects skip 3 with params', async () => {
    const result = await request(app)
      .post('/api/v1/task/all/?take=5&skip=3')
      .send({ id: project.id })
      .set('Cookie', [`accessToken=${token}`]);
    const data = result.body;

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(5);
    expect(data[0].name).toEqual('test47');
    expect(data[1].name).toEqual('test46');
    expect(data[2].name).toEqual('test45');
  });

  test('We cannot get tasks diff user and get error', async () => {
    const result = await request(app)
      .post('/api/v1/task/all/')
      .send({ id: diffProject.id })
      .set('Cookie', [`accessToken=${token}`]);

    expect(result.status).toEqual(404);
    expect(result.body.info).toEqual('project does not exist');
  });

  afterAll(async () => {
    await deleteUser(user);
    await diffUser.remove();
    await getConnection().close();
  });
});
