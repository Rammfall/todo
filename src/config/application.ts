export const environment: string = process.env.environment || 'development';
export const PORT: string | number = process.env.PORT || 3003;
export const bcryptRoundSalt: string | number =
  process.env.bcryptRoundSalt || 10;
export const jwtAccessSecret: string =
  process.env.jwtAccessSecret || 'jwtSecret';
export const jwtExpiredTime: string = process.env.jwtExpiredTime || '15m';
