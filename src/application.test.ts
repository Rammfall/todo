// @ts-ignore
import request from 'supertest';
import app from './application';

describe('Checking application routes', () => {
  // eslint-disable-next-line arrow-body-style
  test('Checking root route', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });
});
