const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: ' ',
  database: 'postgres'
});

(async () => {
  await client.connect();
  await client.query('CREATE DATABASE todo_dev;');
  await client.query('CREATE DATABASE todo_test;');
  await client.query(
    "CREATE USER todo_user WITH ENCRYPTED PASSWORD 'todo_pass';"
  );
  await client.query('GRANT ALL PRIVILEGES ON DATABASE todo_dev TO todo_user;');
  await client.query(
    'GRANT ALL PRIVILEGES ON DATABASE todo_test TO todo_user;'
  );
  await client.end();
})();
