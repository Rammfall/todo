export const environment: string = process.env.environment || 'development';
export const PORT: number = (process.env.PORT && +process.env.PORT) || 3003;
export const bcryptRoundSalt: number =
  (process.env.bcryptRoundSalt && +process.env.bcryptRoundSalt) || 10;
export const jwtAccessSecret: string =
  process.env.jwtAccessSecret || 'jwtSecret';
export const jwtAccessExpiredTime: string =
  process.env.jwtAccessExpiredTime || '15m';
export const jwtAccessTokenWord: string =
  process.env.jwtAccessTokenWord || 'Hater';
export const refreshTokenExpired: number =
  (process.env.refreshTokenExpired && +process.env.refreshTokenExpired) ||
  1000 * 60 * 60 * 24 * 30;
