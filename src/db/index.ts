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

export default (async function instance() {
  await createConnection({
    type,
    host,
    port,
    username,
    password,
    database,
    entities: [UserT, UserSession]
  });
})();
