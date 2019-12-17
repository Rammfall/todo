import { createConnection, Connection } from 'typeorm';

import {
  type,
  database,
  host,
  username,
  password,
  port
} from '../config/database';
import User from './entity/user';

export default async function instance() {
  const connection: Connection = await createConnection({
    database,
    type,
    host,
    username,
    password,
    port,
    entities: [User]
  });

  console.log(connection.isConnected);
}
