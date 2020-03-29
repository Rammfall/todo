import { getConnection } from 'typeorm';
import request from 'supertest';

import app from '../../../application';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import { createSessionToken, createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import Task from '../../../db/entity/task';
import { createTask } from '../../../../testUtils/task';

describe('Update task on route /api/v1/task/update/', () => {
  let user: User;
  let diffUser: User;
  let token: string;
  let project: Project;
  let diffProject: Project;
  let task: Task;
  let diffTask: Task;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('updateTaskApi', 'updateTaskApi@mail.df', 'passs');
    token = await createSessionToken(user);
    project = await createProject(user, 'project');
    task = await createTask(project, 'test');
    diffUser = await createUser(
      'diffUpdateTaskApi',
      'diffUpdateTaskApi@test.tes',
      'pass'
    );
    diffProject = await createProject(diffUser, 'diffPro');
    diffTask = await createTask(diffProject, 'testitest');
  });

  test('Updating task', async () => {
    await request(app)
      .post('/api/v1/task/update/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'newMegaTest', id: task.id });
    const updatedTask: Task = await Task.findOne({ id: task.id });

    expect(updatedTask.name).toEqual('newMegaTest');
  });

  test('Updating task diff user are impossible', async () => {
    const result = await request(app)
      .post('/api/v1/task/update/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ name: 'newMegaTest', id: diffTask.id });

    expect(result.status).toEqual(403);
    expect(result.body.info).toEqual('Task does not exist');
  });

  afterAll(async () => {
    await user.remove();
    await diffUser.remove();
    await getConnection().close();
  });
});
