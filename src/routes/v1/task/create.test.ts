import { getConnection } from 'typeorm';
import request from 'supertest';

import app from '../../../application';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { createSessionToken, createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import Task from '../../../db/entity/task';

describe('Check creating tasks on api, request to /api/v1/task/create/', () => {
  let user: User;
  let project: Project;
  let token: string;
  let diffUser: User;
  let diffProject: Project;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('taskCreateApi', 'taskCreateApi@mail.dd', 'pass');
    token = await createSessionToken(user);
    project = await createProject(user, 'test');
    diffUser = await createUser(
      'taskCreateApiDiff',
      'taskCreateApiDiff@mail.dd',
      'pass'
    );
    diffProject = await createProject(diffUser, 'test');
  });

  test('On request should create task', async () => {
    const result = await request(app)
      .post('/api/v1/task/create/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'test', id: project.id });
    const task: Task = await Task.findOne({ project });
    const { id, name, completed } = result.body;

    expect(id).toEqual(task.id);
    expect(completed).toEqual(false);
    expect(name).toEqual('test');

    await task.remove();
  });

  test('Task will not create to different project different user', async () => {
    const result = await request(app)
      .post('/api/v1/task/create/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'test', id: diffProject.id });
    const task: Task = await Task.findOne({ project: diffProject });
    const { info } = result.body;

    expect(result.status).toEqual(403);
    expect(task).toEqual(undefined);
    expect(info).toEqual('Project is not exist');
  });

  afterAll(async () => {
    await user.remove();
    await diffUser.remove();
    await getConnection().close();
  });
});
