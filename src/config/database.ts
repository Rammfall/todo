export const dbURL: string =
  process.env.dbURL ||
  'postgresql://todo_user:todo_pass@localhost:5432/todo_dev';
export const some: string = process.env.some || 'some';
export const adapter: 'postgres' = 'postgres';
