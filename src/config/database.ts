const { dbHost, dbPort, dbUser, dbPassword, dbName } = process.env;

export const type: 'postgres' = 'postgres';
export const host: string = dbHost || 'localhost';
export const database: string = dbName || 'todo_dev';
export const username: string = dbUser || 'todo_user';
export const password: string = dbPassword || 'todo_pass';
export const ordering: 'DESC' = 'DESC';
export const port: number = (dbPort && +dbPort) || 5432;
