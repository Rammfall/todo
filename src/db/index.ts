import { createConnection } from 'typeorm';
import {
  database,
  host,
  password,
  port,
  type,
  username
} from '../config/database';
import UserT from './entity/user';
import UserSession from './entity/userSession';
import Project from './entity/project';

export default (async function instance() {
  await createConnection({
    type,
    host,
    port,
    username,
    password,
    database,
    entities: [UserT, UserSession, Project],
    logger: 'simple-console'
  });
})();
