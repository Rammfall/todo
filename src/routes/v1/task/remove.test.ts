import { getConnection } from 'typeorm';
import request from 'supertest';

import remove from '../../../application';
import User from '../../../db/entity/user';
import Project from '../../../db/entity/project';
import Task from '../../../db/entity/task';
import { createSessionToken, createUser } from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';
import { createTask } from '../../../../testUtils/task';

describe('Remove task on api /api/v1/task/remove/', () => {
  let user: User;
  let token: string;
  let project: Project;
  let task: Task;
  let diffUser: User;
  let diffProject: Project;
  let diffTask: Task;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser('removeTaskApi', 'removeTaskApi@mail.df', 'passs');
    token = await createSessionToken(user);
    project = await createProject(user, 'project');
    task = await createTask(project, 'test');
    diffUser = await createUser(
      'diffremoveTaskApi',
      'diffremoveTaskApi@test.tes',
      'pass'
    );
    diffProject = await createProject(diffUser, 'diffPro');
    diffTask = await createTask(diffProject, 'notest');
  });

  test('Removing task is possible', async () => {
    await request(remove)
      .post('/api/v1/task/remove/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ id: task.id });
    const removedTask: Task | undefined = await Task.findOne({ id: task.id });

    expect(removedTask).toEqual(undefined);
  });

  test('Removing task different user are impossible', async () => {
    const result = await request(remove)
      .post('/api/v1/task/remove/')
      .set('Cookie', [`accessToken=${token}`])
      .send({ id: diffTask.id });
    const notRemovedTask: Task | undefined = await Task.findOne({
      id: diffTask.id
    });

    if (notRemovedTask) {
      expect(result.status).toEqual(403);
      expect(result.body.info).toEqual('Task does not exist');
      expect(notRemovedTask.id).toEqual(diffTask.id);
    }
  });

  afterAll(async () => {
    await user.remove();
    await diffUser.remove();
    await getConnection().close();
  });
});
