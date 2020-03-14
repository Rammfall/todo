const { dbHost, dbPort, dbUser, dbPassword, dbName } = process.env;

export const type = 'postgres';
export const host = dbHost || 'localhost';
export const database = dbName || 'todo_dev';
export const username = dbUser || 'todo_user';
export const password = dbPassword || 'todo_pass';
export const ordering = 'DESC';
export const port: number = +dbPort || 5432;
