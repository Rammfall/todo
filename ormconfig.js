module.exports = {
  type: 'postgres',
  host: process.env.dbHost || 'localhost',
  port: process.env.dbPort || 5432,
  username: process.env.dbUser || 'todo_user',
  password: process.env.dbPassword || 'todo_pass',
  database: process.env.dbName || 'todo_dev',
  synchronize: true,
  logging: true,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber'
  }
};
