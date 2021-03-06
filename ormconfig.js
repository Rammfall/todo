const { dbHost, dbPort, dbUser, dbPassword, dbName, environment } = process.env;
const ssl = environment === 'staging' || environment === 'production';

module.exports = {
  type: 'postgres',
  host: dbHost || 'localhost',
  port: dbPort || 5432,
  username: dbUser || 'todo_user',
  password: dbPassword || 'todo_pass',
  database: dbName || 'todo_test',
  synchronize: true,
  logging: ['query'],
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/db/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber'
  },
  extra: {
    ssl
  }
};
