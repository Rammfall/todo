import { createConnection, Connection } from 'typeorm';
import { dbURL, adapter } from '../config/database';

export default async () => {
  const connection: Connection = await createConnection({
    url: dbURL,
    type: adapter
  });

  console.log(connection.isConnected);
};
