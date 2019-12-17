const { dbHost, dbPort, dbUser, dbPassword, dbName } = process.env;

module.exports = {
  type: 'postgres',
  host: dbHost || 'localhost',
  port: dbPort || 5432,
  username: dbUser || 'todo_user',
  password: dbPassword || 'todo_pass',
  database: dbName || 'todo_dev',
  synchronize: true,
  logging: true,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber'
  }
};
