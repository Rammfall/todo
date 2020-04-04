import { getConnection } from 'typeorm';
import request from 'supertest';

import all from '../../../application';
import User from '../../../db/entity/user';
import {
  createSessionToken,
  createUser,
  deleteUser
} from '../../../../testUtils/user';
import { createProject } from '../../../../testUtils/project';

describe('Getting projects', () => {
  let user: User;
  let token: string;

  beforeAll(async () => {
    await getConnection().connect();
    user = await createUser(
      'allProjectApi',
      'allProjectApi@email.test',
      'pass'
    );
    token = await createSessionToken(user);
    for (let i = 0; i < 51; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createProject(user, `test${i}`);
    }
  });

  test('Get first 20 projects without params', async () => {
    const result = await request(all)
      .post('/api/v1/project/all/')
      .set('Cookie', [`accessToken=${token}`]);
    const data = result.body;

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(20);
    expect(data[0].name).toEqual('test50');
  });

  test('Get first 50 projects with params', async () => {
    const result = await request(all)
      .post('/api/v1/project/all/?take=50')
      .set('Cookie', [`accessToken=${token}`]);
    const data = result.body;

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(50);
    expect(data[0].name).toEqual('test50');
  });

  test('Get first 5 projects skip 3 with params', async () => {
    const result = await request(all)
      .post('/api/v1/project/all/?take=5&skip=3')
      .set('Cookie', [`accessToken=${token}`]);
    const data = result.body;

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(5);
    expect(data[0].name).toEqual('test47');
    expect(data[1].name).toEqual('test46');
    expect(data[2].name).toEqual('test45');
  });

  afterAll(async () => {
    await deleteUser(user);
    await getConnection().close();
  });
});
